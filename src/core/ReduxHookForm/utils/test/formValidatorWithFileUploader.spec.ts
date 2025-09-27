// mocks
import { fieldMock } from 'test/mocks/reducer/reduxHookFormMock';

// types
import { TFileData } from 'types/types';

// utils
import { formValidatorWithFileUploader } from '../validators';

const mockCallBack = jest.fn();

describe('formValidatorWithFileUploader', () => {
  it('should be not valid', () => {
    // before
    const fiels = {
      testField1: { ...fieldMock },
      testField2: { ...fieldMock },
    };

    // action
    const result = formValidatorWithFileUploader([], mockCallBack)(fiels);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
    expect(result).toBe(false);
  });

  it('should be valid', () => {
    // before
    const fields = {
      testField1: {
        ...fieldMock,
        asyncErrors: [],
        syncErrors: [],
        touched: false,
      },
      testField2: {
        ...fieldMock,
        asyncErrors: [],
        syncErrors: [],
        touched: false,
      },
    };

    // action
    const result = formValidatorWithFileUploader([{}] as Array<TFileData>, mockCallBack)(fields);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
    expect(result).toBe(true);
  });
});
