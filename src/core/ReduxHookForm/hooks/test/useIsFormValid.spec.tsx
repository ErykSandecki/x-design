import { renderHook } from '@testing-library/react';

// hooks
import { useIsFormValid } from '../useIsFormValid';

// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookFormMock';

// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from 'store/reduxHookForm/actionsType';

// utils
import { configureStore } from 'store/store';
import { getProviderWrapper } from 'test/testHelpers';

const formName = 'testForm';

describe('useIsFormValid', () => {
  it('should be valid', () => {
    // mock
    const store = configureStore({
      [REDUX_HOOK_FORM]: {
        ...reduxHookFormStateMock[REDUX_HOOK_FORM],
        testForm: {
          ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm,
          fields: {
            testField1: {
              asyncErrors: [],
              syncErrors: [],
            },
            testField2: {
              asyncErrors: [],
              syncErrors: [],
            },
          },
        },
      },
    });

    // before
    const { result } = renderHook(() => useIsFormValid(formName), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current).toEqual(true);
  });

  it('should be invalid', () => {
    // mock
    const store = configureStore({
      [REDUX_HOOK_FORM]: {
        ...reduxHookFormStateMock[REDUX_HOOK_FORM],
        testForm: {
          ...reduxHookFormStateMock[REDUX_HOOK_FORM].testForm,
          fields: {
            testField1: {
              asyncErrors: [],
              syncErrors: ['error'],
            },
            testField2: {
              asyncErrors: [],
              syncErrors: [],
            },
          },
        },
      },
    });

    // before
    const { result } = renderHook(() => useIsFormValid(formName), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current).toEqual(false);
  });
});
