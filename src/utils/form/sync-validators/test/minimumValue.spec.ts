// types
import { TT } from 'types';

// utils
import { minimumValue } from '../../syncValidators';

const testCases = [
  {
    args: {
      amount: 1,
      value: 0,
    },
    description: 'Should return error',
    expectedResult: 'formValidators.minimumValue',
  },
  {
    args: {
      amount: 1,
      value: 1,
    },
    description: 'Should be success',
    expectedResult: '',
  },
];

describe('minimumValue', () => {
  testCases.forEach(({ args, description, expectedResult }) => {
    it(description, () => {
      // before
      const t = (key: string) => key;
      const { amount, value } = args;
      const result = minimumValue(amount)(t as TT, value);

      // result
      expect(result).toBe(expectedResult);
    });
  });
});
