// types
import { TT } from 'types';

// utils
import { name } from '../../syncValidators';

const testCases = [
  {
    args: {
      value: '',
    },
    description: 'Should return error',
    expectedResult: 'formValidators.name',
  },
  {
    args: {
      value: 'value_V01',
    },
    description: 'Should not return error',
    expectedResult: '',
  },
  {
    args: {
      value: '!*-/?',
    },
    description: 'Should return error',
    expectedResult: 'formValidators.name',
  },
];

describe('name', () => {
  testCases.forEach(({ args, description, expectedResult }) => {
    it(description, () => {
      // before
      const t = (key: string) => key;
      const { value } = args;
      const result = name(t as TT, value);

      // result
      expect(result).toBe(expectedResult);
    });
  });
});
