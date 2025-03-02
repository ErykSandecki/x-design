// mocks
import { fieldMock } from 'test/mocks/reducer/reduxHookFormMock';

// utils
import { triggerSubmitForm } from '../triggerSubmitForm';

const mockCallBack = jest.fn();

describe('triggerSubmitForm', () => {
  it('should trigger submit form', () => {
    // before
    triggerSubmitForm(
      mockCallBack,
      { field: { ...fieldMock } },
      'formName',
      false,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(3);
  });
});
