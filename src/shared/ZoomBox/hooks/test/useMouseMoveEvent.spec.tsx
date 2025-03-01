import { fireEvent, renderHook } from '@testing-library/react';
import { RefObject } from 'react';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { BASE_2D, BASE_3D } from 'shared/ZoomBox/constants';
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseButton, T2DCoordinates } from 'types';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();

describe('useMouseMoveEvent', () => {
  it(`should change position after trigger mouse move`, () => {
    // before
    renderHook(() =>
      useMouseMoveEvent(
        BASE_3D,
        cursorPosition,
        CURSOR_STATES[4],
        mockCallBack,
      ),
    );

    // action
    fireEvent.mouseMove(window, {
      buttons: MouseButton.rmb,
      clientX: 0,
      clientY: 0,
    });

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ x: 0, y: 0, z: 1 });
  });

  it(`should not change position`, () => {
    // before
    renderHook(() =>
      useMouseMoveEvent(
        BASE_3D,
        cursorPosition,
        CURSOR_STATES[4],
        mockCallBack,
      ),
    );

    // action
    fireEvent.mouseMove(window, {
      clientX: 0,
      clientY: 0,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
