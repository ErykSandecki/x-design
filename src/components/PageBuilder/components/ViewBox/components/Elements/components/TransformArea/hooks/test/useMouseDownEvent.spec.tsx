import { MouseEvent, RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

// others
import { BASE_2D } from 'shared';

// store
import { configureStore } from 'store';

// types
import { Anchor } from 'store/pageBuilder/enums';
import { MouseButton, T2DCoordinates } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getProviderWrapper } from 'test';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

describe('useMouseMoveEvent', () => {
  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () => useMouseDownEvent(cursorPosition, MouseMode.default),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    result.current(Anchor.east, {
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
    const { result } = renderHook(
      () => useMouseDownEvent(cursorPosition, MouseMode.comment),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    result.current(Anchor.east, {
      buttons: MouseButton.lmb,
      stopPropagation: mockCallBack as any,
    } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
