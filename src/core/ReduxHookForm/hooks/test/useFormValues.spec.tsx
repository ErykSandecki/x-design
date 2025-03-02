import { renderHook } from '@testing-library/react';

// hooks
import { useFormValues } from '../useFormValues';

// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookFormMock';

// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from 'store/reduxHookForm/actionsType';

// utils
import { configureStore } from 'store/store';
import { getProviderWrapper } from 'test/testHelpers';

const stateMock = {
  ...reduxHookFormStateMock,
};

describe('useFormValues', () => {
  it('should return values', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useFormValues('testForm'), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current()).toEqual({ testField: '' });
  });

  it('should return with previous value', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useFormValues('testForm'), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current(true)).toEqual({ testField: '' });
  });

  it('should return values without parse', () => {
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
              parse: undefined,
            },
          },
        },
      },
    });

    // before
    const { result } = renderHook(() => useFormValues('testForm'), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current()).toEqual({ testField: '' });
  });
});
