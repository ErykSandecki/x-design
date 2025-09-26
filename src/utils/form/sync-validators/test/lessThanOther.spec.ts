// types
import { TField } from 'store/reduxHookForm/types';

// utils
import { lessThanOther } from '../../syncValidators';

const testCases = [
  {
    args: {
      value: 2,
    },
    description: 'Should return error',
    expectedResult: 'formValidators.lessThanOther',
  },
  {
    args: {
      value: 0,
    },
    description: 'Should be success',
    expectedResult: '',
  },
];

describe('lessThanOther', () => {
  testCases.forEach(({ args, description, expectedResult }) => {
    it(description, () => {
      // before
      const t = (key: string): any => key;
      const { value } = args;

      const result = lessThanOther('field', 'translatedField')(t as TT, value, {
        field: { value: 1 } as TField,
      });

      // result
      expect(result).toBe(expectedResult);
    });
  });
});
