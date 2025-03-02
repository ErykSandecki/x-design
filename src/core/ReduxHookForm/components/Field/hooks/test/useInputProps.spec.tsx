import { renderHook } from '@testing-library/react';

// hooks
import { useInputProps } from '../useInputProps';

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

const mockCallBack = jest.fn();

jest.mock('../../../../utils/dispatchFieldHandler', () => ({
  dispatchFieldHandler: () => mockCallBack,
}));

describe('useInputProps behaviors', () => {
  it('should return input props & trigger every events', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () => useInputProps('testForm', 'testField'),
      {
        wrapper: getProviderWrapper(store),
      },
    );
    const { name, onBlur, onChange, onFocus, value } = result.current;

    // action
    onBlur('');
    onChange('');
    onFocus('');

    // result
    expect(name).toBe('testField');
    expect(value).toBe('');
    expect(mockCallBack.mock.calls.length).toBe(3);

    expect(
      store.getState()[REDUX_HOOK_FORM].testForm.fields.testField,
    ).toStrictEqual({
      active: false,
      asyncErrors: [],
      data: {},
      emptyValue: '',
      fieldsToClearOnChange: [],
      initialValue: '',
      isPending: false,
      parse: expect.any(Function),
      previousValue: '',
      syncErrors: [],
      touched: false,
      value: '',
      visited: false,
    });
  });

  it('should trigger blur with function to transform value on blur', () => {
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
              formatOnBlur: () => 'formatOnBlur',
            },
          },
        },
      },
    });

    // before
    const { result } = renderHook(
      () => useInputProps('testForm', 'testField'),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // mock
    const { name, onBlur, value } = result.current;

    // action
    onBlur('');

    // result
    expect(name).toBe('testField');
    expect(value).toBe('');
    expect(mockCallBack.mock.calls.length).toBe(1);

    expect(
      store.getState()[REDUX_HOOK_FORM].testForm.fields.testField,
    ).toStrictEqual({
      active: false,
      asyncErrors: [],
      data: {},
      emptyValue: '',
      fieldsToClearOnChange: [],
      formatOnBlur: expect.any(Function),
      initialValue: '',
      isPending: false,
      parse: expect.any(Function),
      previousValue: '',
      syncErrors: [],
      touched: false,
      value: '',
      visited: false,
    });
  });

  it('should trigger onChange when is valueSinceLastSubmit & passed function to transform value on change', () => {
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
              formatOnChange: () => 'formatOnChange',
              valueSinceLastSubmit: true,
            },
          },
        },
      },
    });

    // before
    const { result } = renderHook(
      () => useInputProps('testForm', 'testField'),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // mock
    const { name, onChange, value } = result.current;

    // action
    onChange('');

    // result
    expect(name).toBe('testField');
    expect(value).toBe('');
    expect(mockCallBack.mock.calls.length).toBe(1);

    expect(
      store.getState()[REDUX_HOOK_FORM].testForm.fields.testField,
    ).toStrictEqual({
      active: false,
      asyncErrors: [],
      data: {},
      emptyValue: '',
      fieldsToClearOnChange: [],
      formatOnChange: expect.any(Function),
      initialValue: '',
      isPending: false,
      parse: expect.any(Function),
      previousValue: '',
      syncErrors: [],
      touched: false,
      value: '',
      valueSinceLastSubmit: true,
      visited: false,
    });
  });

  it('should trigger focus with function to transform value on focus', () => {
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
              formatOnFocus: () => 'formatOnFocus',
            },
          },
        },
      },
    });

    // before
    const { result } = renderHook(
      () => useInputProps('testForm', 'testField'),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // mock
    const { name, onFocus, value } = result.current;

    // action
    onFocus('');

    // result
    expect(name).toBe('testField');
    expect(value).toBe('');
    expect(mockCallBack.mock.calls.length).toBe(1);

    expect(
      store.getState()[REDUX_HOOK_FORM].testForm.fields.testField,
    ).toStrictEqual({
      active: false,
      asyncErrors: [],
      data: {},
      emptyValue: '',
      fieldsToClearOnChange: [],
      formatOnFocus: expect.any(Function),
      initialValue: '',
      isPending: false,
      parse: expect.any(Function),
      previousValue: '',
      syncErrors: [],
      touched: false,
      value: '',
      visited: false,
    });
  });

  it('should clear value when value was changed', () => {
    // mock
    const store = configureStore({
      [REDUX_HOOK_FORM]: {
        testForm: {
          ...stateMock[REDUX_HOOK_FORM].testForm,
          fields: {
            testField1: {
              ...stateMock[REDUX_HOOK_FORM].testForm.fields.testField,
              fieldsToClearOnChange: ['testField2'],
              value: '',
            },
            testField2: {
              ...stateMock[REDUX_HOOK_FORM].testForm.fields.testField,
              value: 'value',
            },
          },
        },
      },
    });

    // before
    const { result } = renderHook(
      () => useInputProps('testForm', 'testField1'),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // mock
    const { onChange } = result.current;

    // action
    onChange('value');

    // result
    expect(
      store.getState()[REDUX_HOOK_FORM].testForm.fields.testField2.value,
    ).toBe('');
  });

  it('should not clear value when value was not changed', () => {
    // mock
    const store = configureStore({
      [REDUX_HOOK_FORM]: {
        testForm: {
          ...stateMock[REDUX_HOOK_FORM].testForm,
          fields: {
            testField1: {
              ...stateMock[REDUX_HOOK_FORM].testForm.fields.testField,
              fieldsToClearOnChange: ['testField2'],
              value: '',
            },
            testField2: {
              ...stateMock[REDUX_HOOK_FORM].testForm.fields.testField,
              value: 'value',
            },
          },
        },
      },
    });

    // before
    const { result } = renderHook(
      () => useInputProps('testForm', 'testField1'),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // mock
    const { onChange } = result.current;

    // action
    onChange('');

    // result
    expect(
      store.getState()[REDUX_HOOK_FORM].testForm.fields.testField2.value,
    ).toBe('value');
  });

  it('should clear value when value from array was changed ', () => {
    // mock
    const store = configureStore({
      [REDUX_HOOK_FORM]: {
        testForm: {
          ...stateMock[REDUX_HOOK_FORM].testForm,
          fields: {
            testField1: {
              ...stateMock[REDUX_HOOK_FORM].testForm.fields.testField,
              fieldsToClearOnChange: ['testField2'],
              value: ['', '', ''],
            },
            testField2: {
              ...stateMock[REDUX_HOOK_FORM].testForm.fields.testField,
              value: 'value',
            },
          },
        },
      },
    });

    // before
    const { result } = renderHook(
      () => useInputProps('testForm', 'testField1'),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // mock
    const { onChange } = result.current;

    // action
    onChange(['value', 'value', 'value']);

    // result
    expect(
      store.getState()[REDUX_HOOK_FORM].testForm.fields.testField2.value,
    ).toBe('');
  });

  it('should not clear value when value from array was not changed ', () => {
    // mock
    const store = configureStore({
      [REDUX_HOOK_FORM]: {
        testForm: {
          ...stateMock[REDUX_HOOK_FORM].testForm,
          fields: {
            testField1: {
              ...stateMock[REDUX_HOOK_FORM].testForm.fields.testField,
              fieldsToClearOnChange: ['testField2'],
              value: ['', '', ''],
            },
            testField2: {
              ...stateMock[REDUX_HOOK_FORM].testForm.fields.testField,
              value: 'value',
            },
          },
        },
      },
    });

    // before
    const { result } = renderHook(
      () => useInputProps('testForm', 'testField1'),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // mock
    const { onChange } = result.current;

    // action
    onChange(['', '', '']);

    // result
    expect(
      store.getState()[REDUX_HOOK_FORM].testForm.fields.testField2.value,
    ).toBe('value');
  });
});
