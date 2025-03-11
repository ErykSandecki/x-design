import { renderHook } from '@testing-library/react';

// hooks
import { useClickableAreaEvents } from '../useClickableAreaEvents';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { configureStore } from 'store';

// utils
import { getProviderWrapper } from 'test';

const stateMock = {
  ...pageBuilderStateMock,
};

describe('useClickableAreaEvents', () => {
  it(`should return data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useClickableAreaEvents(), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current).toStrictEqual({
      onMouseDown: expect.any(Function),
    });
  });
});
