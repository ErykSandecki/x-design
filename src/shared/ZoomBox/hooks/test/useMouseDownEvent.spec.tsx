import { renderHook } from '@testing-library/react';
import { RefObject, WheelEvent } from 'react';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

// others
import { BASE_2D, BASE_3D } from 'shared/ZoomBox/constants';
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseButton, T2DCoordinates } from 'types';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();

describe('useMouseDownEvent', () => {
  it(`should save mouse position after trigger mouse down`, () => {
    // before
    const { result } = renderHook(() =>
      useMouseDownEvent(BASE_3D, cursorPosition, mockCallBack, mockCallBack),
    );

    // action
    result.current({
      buttons: 1,
      clientX: 0,
      clientY: 0,
    } as WheelEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
    expect(mockCallBack.mock.calls[1][0]).toBe(CURSOR_STATES[MouseButton.lmb]);
    expect(cursorPosition.current).toStrictEqual({ x: 0, y: 0 });
  });
});
