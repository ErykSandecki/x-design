// mocks
import { fieldMock } from 'test/mocks/reducer/reduxHookFormMock';

// types
import { TFields } from 'store/reduxHookForm/types';

// utils
import { validateForm } from '../formStates';

const testCases = [
  {
    args: {
      fields: {
        email: { ...fieldMock, asyncErrors: [], syncErrors: [] },
        password: { ...fieldMock, asyncErrors: [], syncErrors: [] },
      },
    },
    description: 'Should be valid',
    expectedResult: true,
  },
  {
    args: {
      fields: {
        email: { ...fieldMock, asyncErrors: ['Error'], syncErrors: [] },
        password: { ...fieldMock, asyncErrors: [], syncErrors: [] },
      },
    },
    description: 'Should be invalid',
    expectedResult: false,
  },
  {
    args: {
      fields: {
        email: { ...fieldMock, asyncErrors: [], syncErrors: ['Error'] },
      },
    },
    description: 'Should be invalid',
    expectedResult: false,
  },
  {
    args: {
      fields: {
        email: { ...fieldMock, asyncErrors: ['Error'], syncErrors: ['Error'] },
      },
    },
    description: 'Should be invalid',
    expectedResult: false,
  },
  {
    args: {
      fields: undefined,
    },
    description: 'Should be valid',
    expectedResult: true,
  },
];

describe('validateForm', () => {
  testCases.forEach(({ args, description, expectedResult }) => {
    it(description, () => {
      // before
      const { fields } = args;
      const result = validateForm(fields as TFields);

      // result
      expect(result).toBe(expectedResult);
    });
  });
});
