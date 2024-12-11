// types
import { TReduxHookFormState } from '../../types';

// utils
import { notifyFields } from '../../utils';

const mockCallBack = jest.fn();

const testCases = [
  {
    args: {
      stateMock: {
        testForm: {
          fields: {
            testField: {},
          },
        },
      },
      when: 'after',
    },
    description: 'Should not notify input',
    expectedResult: 0,
  },
  {
    args: {
      stateMock: {
        testForm: {
          fields: {
            testField: {
              afterSubmit: mockCallBack,
            },
          },
        },
      },
      when: 'after',
    },
    description: 'Should notify input after finish submit',
    expectedResult: 1,
  },
  {
    args: {
      stateMock: {
        testForm: {
          fields: {
            testField: {
              beforeSubmit: mockCallBack,
            },
          },
        },
      },
      when: 'before',
    },
    description: 'Should notify input before start submit',
    expectedResult: 1,
  },
  {
    args: {
      stateMock: {},
      when: 'before',
    },
    description: 'Should not notify when form is empty',
    expectedResult: 0,
  },
];

describe('notifyFields', () => {
  testCases.forEach(({ args, description, expectedResult }) => {
    it(description, () => {
      // before
      const { stateMock, when } = args;

      notifyFields(
        'testForm',
        stateMock as TReduxHookFormState,
        when as 'after' | 'before',
      );

      // result
      expect(mockCallBack.mock.calls.length).toBe(expectedResult);
    });
  });
});
