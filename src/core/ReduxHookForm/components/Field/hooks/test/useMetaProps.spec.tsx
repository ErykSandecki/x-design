import { renderHook } from '@testing-library/react';

// hooks
import { useMetaProps } from '../useMetaProps';

// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookFormMock';

// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from 'store/reduxHookForm/actionsType';

// store
import { configureStore } from 'store/store';

// utils
import { getProviderWrapper } from 'test/testHelpers';

const stateMock = {
  ...reduxHookFormStateMock,
};

describe('useMetaProps', () => {
  it('should return meta props', () => {
    // mock
    const store = configureStore(stateMock);

    const expectedResult = {
      active: false,
      data: {},
      dirty: false,
      errors: [],
      initialValue: '',
      invalid: false,
      modified: undefined,
      pristine: true,
      submitting: false,
      touched: false,
      valid: true,
      validating: false,
      visited: false,
    };

    // before
    const { result } = renderHook(() => useMetaProps('testForm', 'testField'), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current).toStrictEqual(expectedResult);
  });

  it('should return meta props', () => {
    // mock
    const store = configureStore({
      [REDUX_HOOK_FORM]: {
        ...reduxHookFormStateMock[REDUX_HOOK_FORM],
        testForm: {
          ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm,
          fields: {
            ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm.fields,
            testField: {
              ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm.fields
                .testField,
              data: undefined,
            },
          },
        },
      },
    });

    const expectedResult = {
      active: false,
      dirty: false,
      errors: [],
      initialValue: '',
      invalid: false,
      modified: undefined,
      pristine: true,
      submitting: false,
      touched: false,
      valid: true,
      validating: false,
      visited: false,
    };

    // before
    const { result } = renderHook(() => useMetaProps('testForm', 'testField'), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current).toStrictEqual(expectedResult);
  });

  it('should return empty object when field is not exist', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useMetaProps('testForm', 'unknown'), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current).toStrictEqual({});
  });
});
