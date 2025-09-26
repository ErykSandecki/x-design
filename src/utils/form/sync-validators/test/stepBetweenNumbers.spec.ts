// types
import { TField } from 'store/reduxHookForm/types';

// utils
import { stepBetweenNumbers } from '../../syncValidators';

const testCases = [
  {
    args: {
      value: 2,
    },
    description: 'Should return error',
    expectedResult: 'formValidators.stepBetweenNumbers',
  },
  {
    args: {
      value: 0,
    },
    description: 'Should be success',
    expectedResult: '',
  },
];

describe('stepBetweenNumbers', () => {
  testCases.forEach(({ args, description, expectedResult }) => {
    it(description, () => {
      // before
      const t = (key: string): any => key;
      const { value } = args;

      const result = stepBetweenNumbers('field1', 'field2')(t as TT, value, {
        field1: { value: 1 } as TField,
        field2: { value: 1 } as TField,
      });

      // result
      expect(result).toBe(expectedResult);
    });
  });
});
