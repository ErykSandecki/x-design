// mocks
import { fieldMock } from 'test/mocks/reducer/reduxHookForm';

// utils
import { markInputsAsTouched } from '../markInputsAsTouched';

const mockCallBack = jest.fn();

describe('markInputsAsTouched', () => {
  it('should mark all inputs as touched', () => {
    // before
    const fiels = {
      testField1: { ...fieldMock, touched: false },
      testField2: { ...fieldMock, touched: false },
    };

    // action
    markInputsAsTouched(mockCallBack, 'testForm', fiels);

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });
});
