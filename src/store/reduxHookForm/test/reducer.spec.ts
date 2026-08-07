// mocks
import { fieldMock, formMock, reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookFormMock';

// store
import reduxHookForm, {
  blur,
  change,
  clearFields,
  destroyForm,
  focus,
  initField,
  mountForm,
  REDUCER_KEY,
  setPending,
  setPendingField,
  setTouchedField,
  submit,
  submitError,
  submitSuccess,
  updateAsyncErrors,
  updateFormValidator,
  updateSyncErrors,
} from '../reducer';

// types
import { TAction } from 'types/redux';
import { TReduxHookFormState } from '../types';

describe('ReduxHookForm', () => {
  const reducer = (action: TAction, initialState = {}): TReduxHookFormState =>
    reduxHookForm(initialState as TReduxHookFormState, action);

  it('should return default state', () => {
    // before
    const state = reduxHookForm({ ...reduxHookFormStateMock[REDUCER_KEY] }, { type: '' });

    // result
    expect(state).toEqual(reduxHookFormStateMock[REDUCER_KEY]);
  });

  it('should handle CLEAR_FIELDS', () => {
    // mock
    const formName = 'testForm';
    const name = 'testField';
    const names = ['testField'];

    // before
    const state = reducer(clearFields({ formName, names }), {
      [formName]: {
        ...formMock,
        fields: { [name]: { ...fieldMock, value: 'value' } },
      },
    });

    // result
    expect(state).toEqual({
      [formName]: {
        ...formMock,
        fields: {
          ...formMock.fields,
          [name]: {
            ...fieldMock,
            value: '',
          },
        },
      },
    });
  });

  it('should handle BLUR', () => {
    // mock
    const payload = {
      field: { active: false, touched: true, value: '' },
      formName: 'testForm',
      name: 'testField',
    };

    // before
    const state = reducer(blur(payload), {
      testForm: {
        ...formMock,
        fields: { testField: { ...fieldMock, active: true } },
      },
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        fields: {
          ...formMock.fields,
          testField: {
            ...fieldMock,
            active: false,
            touched: true,
            value: '',
          },
        },
      },
    });
  });

  it('should handle CHANGE', () => {
    // mock
    const payload = {
      field: { modified: true, value: '' },
      formName: 'testForm',
      name: 'testField',
    };

    // before
    const state = reducer(change(payload), {
      testForm: { ...formMock, fields: { testField: fieldMock } },
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        fields: {
          ...formMock.fields,
          testField: {
            ...fieldMock,
            modified: true,
            value: '',
          },
        },
      },
    });
  });

  it('should handle DESTROY_FORM', () => {
    // before
    const state = reducer(destroyForm('testForm'), {
      testForm: formMock,
    });

    // result
    expect(state).toEqual({});
  });

  it('should handle FOCUS', () => {
    // mock
    const payload = {
      field: { modified: true, value: '' },
      formName: 'testForm',
      name: 'testField',
    };

    // before
    const state = reducer(focus(payload), {
      testForm: { ...formMock, fields: { testField: fieldMock } },
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        fields: {
          ...formMock.fields,
          testField: {
            ...fieldMock,
            modified: true,
            value: '',
          },
        },
      },
    });
  });

  it('should handle INIT_FIELD', () => {
    // mock
    const payload1 = {
      field: fieldMock,
      formName: 'testForm',
      name: 'testField',
    };

    const payload2 = {
      field: fieldMock,
      formName: 'testForm',
      name: 'testField',
    };

    // before
    const state1 = reducer(initField(payload1), { testForm: formMock });
    const state2 = reducer(initField(payload2), {});

    // result
    expect(state1).toEqual({
      testForm: {
        ...formMock,
        fields: {
          testField: fieldMock,
        },
      },
    });

    expect(state2).toEqual({});
  });

  it('should handle MOUNT_FORM', () => {
    // mock
    const payload = { testForm: formMock };

    // before
    const state = reducer(mountForm(payload), {});

    expect(state).toEqual({
      testForm: formMock,
    });
  });

  it('should handle SET_PENDING', () => {
    // mock
    const payload = {
      form: { isPending: true },
      formName: 'testForm',
    };

    // before
    const state = reducer(setPending(payload), {
      testForm: formMock,
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        isPending: true,
      },
    });
  });

  it('should handle SET_PENDING_FIELD', () => {
    // mock
    const payload = {
      field: { isPending: true },
      formName: 'testForm',
      name: 'testField',
    };

    // before
    const state = reducer(setPendingField(payload), {
      testForm: { ...formMock, fields: { testField: fieldMock } },
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        fields: {
          ...formMock.fields,
          testField: {
            ...fieldMock,
            isPending: true,
          },
        },
      },
    });
  });

  it('should handle SET_TOUCHED_FIELD', () => {
    // mock
    const payload = {
      field: { touched: true },
      formName: 'testForm',
      name: 'testField',
    };

    // before
    const state = reducer(setTouchedField(payload), {
      testForm: { ...formMock, fields: { testField: fieldMock } },
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        fields: {
          ...formMock.fields,
          testField: {
            ...fieldMock,
            touched: true,
          },
        },
      },
    });
  });

  it('should handle SUBMIT', () => {
    // mock
    const payload = 'testForm';

    // before
    const state = reducer(submit(payload), {
      testForm: { ...formMock, fields: { testField: fieldMock } },
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        fields: {
          ...formMock.fields,
          testField: {
            ...fieldMock,
            modifiedSinceLastSubmit: false,
            valueSinceLastSubmit: '',
          },
        },
        isPending: true,
      },
    });
  });

  it('should handle SUBMIT_ERROR', () => {
    // mock
    const payload = { error: 'testError', formName: 'testForm' };

    // before
    const state = reducer(submitError(payload), {
      testForm: { ...formMock },
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        error: 'testError',
        isPending: false,
      },
    });
  });

  it('should handle SUBMIT_SUCCESS', () => {
    // mock
    const payload = 'testForm';

    // before
    const state = reducer(submitSuccess(payload), {
      testForm: { ...formMock },
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        isPending: false,
      },
    });
  });

  it('should handle UPDATE_ASYNC_ERRORS', () => {
    // mock
    const payload = {
      field: { asyncErrors: ['testError'], isPending: false },
      formName: 'testForm',
      name: 'testField',
    };

    // before
    const state = reducer(updateAsyncErrors(payload), {
      testForm: {
        ...formMock,
        fields: {
          testField: { ...fieldMock, isPending: true },
        },
      },
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        fields: {
          ...formMock.fields,
          testField: {
            ...fieldMock,
            asyncErrors: ['testError'],
            isPending: false,
          },
        },
      },
    });
  });

  it('should handle UPDATE_FORM_VALIDATOR', () => {
    // mock
    const payload = {
      form: { isValid: true },
      formName: 'testForm',
    };

    // before
    const state = reducer(updateFormValidator(payload), {
      testForm: formMock,
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        isValid: true,
      },
    });
  });

  it('should handle UPDATE_SYNC_ERRORS', () => {
    // mock
    const payload = {
      field: { syncErrors: ['testError'] },
      formName: 'testForm',
      name: 'testField',
    };

    // before
    const state = reducer(updateSyncErrors(payload), {
      testForm: {
        ...formMock,
        fields: {
          testField: fieldMock,
        },
      },
    });

    // result
    expect(state).toEqual({
      testForm: {
        ...formMock,
        fields: {
          ...formMock.fields,
          testField: {
            ...fieldMock,
            syncErrors: ['testError'],
          },
        },
      },
    });
  });
});
