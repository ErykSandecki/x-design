import { renderHook } from '@testing-library/react';

// hooks
import { useField } from '../useField';

// mocks
import { reduxHookFormStateMock } from 'test/mocks/reducer/reduxHookForm';

// store
import { configureStore } from 'store/store';

// utils
import { getProviderWrapper } from 'test/testHelpers';

const stateMock = {
  ...reduxHookFormStateMock,
};

describe('useField', () => {
  it('should return input & meta props', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () => useField<string>('testForm', 'testField'),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // mock
    const expectedResult = {
      active: false,
      data: {},
      dirty: false,
      errors: [],
      initialValue: '',
      invalid: false,
      modified: undefined,
      name: 'testField',
      onBlur: result.current.onBlur,
      onChange: result.current.onChange,
      onFocus: result.current.onFocus,
      pristine: true,
      submitting: false,
      touched: false,
      valid: true,
      validating: false,
      value: '',
      visited: false,
    };

    // result
    expect(result.current).toStrictEqual(expectedResult);
  });
});
