import { fireEvent, renderHook } from '@testing-library/react';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseUpEvent } from '../useMouseUpEvent';

// store
import { configureStore } from 'store';

// utils
import { getProviderWrapper } from 'test';

const mockCallBack = jest.fn();

const stateMock = {
  ...pageBuilderStateMock,
};

describe('useMouseUpEvent', () => {
  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useMouseUpEvent(true, mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.mouseUp(window, {});

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should not trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useMouseUpEvent(false, mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.mouseUp(window, {});

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
