import { omit } from 'lodash';
import { renderHook } from '@testing-library/react';

// hooks
import { useForm } from '../useForm';

// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookForm';

// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from 'store/reduxHookForm/actionsType';

// store
import { configureStore } from 'store/store';

// utils
import { getProviderWrapper } from 'test/testHelpers';

const stateMock = {
  [REDUX_HOOK_FORM]: {
    ...reduxHookFormStateMock[REDUX_HOOK_FORM],
    testForm: {
      ...omit(reduxHookFormStateMock[REDUX_HOOK_FORM].testForm, 'fields'),
    },
  },
};

describe('useForm', () => {
  it('should return form props', () => {
    // mock
    const store = configureStore(stateMock);

    const expectedResult = {
      asyncTimeDelay: 0,
      error: '',
      isPending: false,
      isValid: false,
    };

    // before
    const { result } = renderHook(() => useForm('testForm'), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current).toStrictEqual(expectedResult);
  });
});
