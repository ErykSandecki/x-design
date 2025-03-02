import { renderHook } from '@testing-library/react';

// core
import { FormContext } from '../../../Form/Form';

// hooks
import { useInitField } from '../useInitField';

// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookFormMock';

// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from 'store/reduxHookForm/actionsType';

// store
import { configureStore } from 'store/store';

// utils
import { getProviderWrapper, sleep } from 'test/testHelpers';

const stateMock = {
  ...reduxHookFormStateMock,
};

describe('useInitField behaviors', () => {
  it('should return validators and subscribed fields', async () => {
    // mock
    const formName = 'testForm';
    const fieldName = 'fieldName';
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useInitField(
          undefined,
          [],
          undefined,
          undefined,
          false,
          [],
          undefined,
          undefined,
          undefined,
          undefined,
          fieldName,
          undefined,
          [],
          [],
          false,
          false,
        ),
      {
        wrapper: (children) => (
          <FormContext.Provider value={formName}>
            {getProviderWrapper(store)(children)}
          </FormContext.Provider>
        ),
      },
    );

    // wait
    await sleep(100);

    // result
    expect(result.current).toStrictEqual({
      subscriptionFieldsValues: [],
      updateAsyncValidators: expect.any(Function),
      updateSyncValidators: expect.any(Function),
    });

    expect(
      store.getState()[REDUX_HOOK_FORM][formName].fields[fieldName],
    ).not.toBeNull();
  });
});
