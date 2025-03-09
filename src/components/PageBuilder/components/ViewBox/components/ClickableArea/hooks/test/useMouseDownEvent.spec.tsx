import { MouseEvent } from 'react';
import { renderHook } from '@testing-library/react';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

// store
import { configureStore } from 'store';

// types
import { MouseButton } from 'types';

// utils
import { getProviderWrapper } from 'test';

const mockCallBack = jest.fn();

const stateMock = {
  ...pageBuilderStateMock,
};

describe('useMouseMoveEvent', () => {
  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useMouseDownEvent(), {
      wrapper: getProviderWrapper(store),
    });

    // action
    result.current({
      buttons: MouseButton.lmb,
      stopPropagation: mockCallBack as any,
    } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should not trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useMouseDownEvent(), {
      wrapper: getProviderWrapper(store),
    });

    // action
    result.current({ stopPropagation: mockCallBack as any } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
