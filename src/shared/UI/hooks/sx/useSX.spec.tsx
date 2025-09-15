import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react';

// core
import { ContextProvider } from 'core';

// hooks
import { useSX } from './useSX';

// store
import { configureStore } from 'store';

// types
import { Theme } from 'types';

jest.mock('@emotion/css', () => ({
  ...(jest.requireActual('@emotion/css') as object),
  css: (data) => data,
}));

describe('useSX', () => {
  it(`should return sx data`, () => {
    // mock
    const store = configureStore();

    // before
    const { result } = renderHook(() => useSX([], {}), {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <ContextProvider theme={Theme.dark}>{children}</ContextProvider>
        </Provider>
      ),
    });

    // result
    expect(result.current.length).toBe(12);
  });
});
