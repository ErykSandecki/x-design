// utils
import { required } from '../../syncValidators';

const testCases = [
  {
    args: {
      value: '',
    },
    description: 'Should return error',
    expectedResult: 'formValidators.required',
  },
  {
    args: {
      value: 'value',
    },
    description: 'Should not return error',
    expectedResult: '',
  },
  {
    args: {
      value: [],
    },
    description: 'Should return error',
    expectedResult: 'formValidators.required',
  },
  {
    args: {
      value: 0,
    },
    description: 'Should not return error',
    expectedResult: '',
  },
  {
    args: {
      value: ['value'],
    },
    description: 'Should not return error',
    expectedResult: '',
  },
];

describe('required', () => {
  testCases.forEach(({ args, description, expectedResult }) => {
    it(description, () => {
      // before
      const t = (key: string): any => key;
      const { value } = args;
      const result = required(t as TT, value);

      // result
      expect(result).toBe(expectedResult);
    });
  });
});
