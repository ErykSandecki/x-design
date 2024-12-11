// types
import { TUseMetaProps } from 'core/ReduxHookForm/components/Field/hooks/useMetaProps';

// utils
import { getErrorMessage } from '../inputStates';

const testCases = [
  {
    args: {
      meta: { errors: [], touched: false },
    },
    description: 'Should not return error if input is not touched',
    expectedResult: '',
  },
  {
    args: {
      meta: { errors: ['Error'], touched: false },
    },
    description: 'Should not return error if input is not touched with errors',
    expectedResult: '',
  },
  {
    args: {
      meta: { errors: [], touched: true },
    },
    description: 'Should not return error if input is touched',
    expectedResult: '',
  },
  {
    args: {
      meta: { errors: ['Error'], touched: true },
    },
    description: 'Should return error if input is touched with errors',
    expectedResult: 'Error',
  },
];

describe('getErrorMessage', () => {
  testCases.forEach(({ args, description, expectedResult }) => {
    it(description, () => {
      // before
      const { meta } = args;
      const result = getErrorMessage(meta as TUseMetaProps<string>);

      // result
      expect(result).toBe(expectedResult);
    });
  });
});
