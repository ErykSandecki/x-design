import { cloneDeep } from 'lodash';
import { renderHook } from '@testing-library/react';

// hooks
import { useValidators } from '../useValidators';

// mocks
import { fieldMock } from 'test/mocks/reducer/reduxHookFormMock';

// others
import { REDUCER_KEY as REDUX_HOOK_FORM } from 'store/reduxHookForm/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { TAsyncValidator, TFieldValue, TSyncValidator } from '../../../../types';
import { TFields } from 'store/reduxHookForm/types';

// utils
import { getProviderWrapper } from 'test/testHelpers';

const asyncValidator = (value: TFieldValue): any => new Promise((resolve) => resolve(value ? 'Success' : 'Error'));

const syncValidator = (value: TFieldValue): any => (value ? 'Success' : 'Error');

const asyncValidators = [(): any => asyncValidator(''), (): any => asyncValidator('value')] as Array<TAsyncValidator>;

const compareValidator: TSyncValidator = (_, value: TFieldValue, fields: TFields) =>
  value === fields.testField2.value ? 'Equal' : 'Not Equal';

const syncValidators = [(): any => syncValidator(''), (): any => syncValidator('value')] as Array<TSyncValidator>;

const mockCallBack = jest.fn();

const stateMock = {
  [REDUX_HOOK_FORM]: {
    testForm: {
      asyncTimeDelay: 0,
      error: '',
      fields: {
        testField1: cloneDeep(fieldMock),
        testField2: cloneDeep(fieldMock),
      },
      isPending: false,
      isValid: false,
    },
  },
};

jest.mock('../../../../utils/dispatchFieldHandler', () => ({
  dispatchFieldHandler: (): any => mockCallBack,
}));

jest.mock('lodash', () => ({
  ...(jest.requireActual('lodash') as object),
  debounce: async (callback: any): Promise<any> => await callback(),
}));

describe('useValidators', () => {
  it('should return async errors', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useValidators(asyncValidators, 'testForm', 'testField1', [], syncValidators), {
      wrapper: getProviderWrapper(store),
    });

    // mock
    const { getAsyncErrors } = result.current;

    // action
    const resultFromValidators = await getAsyncErrors('');

    // result
    expect(resultFromValidators).toStrictEqual(['Error', 'Success']);
  });

  it('should return sync errors', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useValidators(asyncValidators, 'testForm', 'testField1', [], syncValidators), {
      wrapper: getProviderWrapper(store),
    });

    // mock
    const { getSyncErrors } = result.current;

    // action
    const resultFromValidators = getSyncErrors('');

    // result
    expect(resultFromValidators).toStrictEqual(['Error', 'Success']);
  });

  it('should trigger async validators', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useValidators(asyncValidators, 'testForm', 'testField1', [], syncValidators), {
      wrapper: getProviderWrapper(store),
    });

    // action
    await result.current.updateAsyncValidators;

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it('should trigger async validators when are empty', async () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useValidators([], 'testForm', 'testField1', [], syncValidators), {
      wrapper: getProviderWrapper(store),
    });

    // action
    await result.current.updateAsyncValidators;

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it('should trigger sync validators', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useValidators(asyncValidators, 'testForm', 'testField1', [], syncValidators), {
      wrapper: getProviderWrapper(store),
    });

    // action
    result.current.updateSyncValidators('');

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it('should compare sync error with value from another field', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useValidators(asyncValidators, 'testForm', 'testField1', ['testField2'], [...syncValidators, compareValidator]),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // mock
    const { getSyncErrors } = result.current;

    // action
    const resultFromValidators = getSyncErrors('');

    // result
    expect(resultFromValidators).toStrictEqual(['Error', 'Success', 'Equal']);
  });
});
