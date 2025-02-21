import { renderHook } from '@testing-library/react';
import { WheelEvent } from 'react';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

// others
import { CURSOR_STATES } from 'constant/constants';
import { INITIAL_COORDINATES } from 'shared/ZoomBox/constants';

// types
import { MouseButton } from 'types';

const mockCallBack = jest.fn();

describe('useMouseDownEvent', () => {
  it(`should save mouse position after trigger mouse down`, () => {
    // before
    const { result } = renderHook(() =>
      useMouseDownEvent(INITIAL_COORDINATES, mockCallBack, mockCallBack),
    );

    // action
    result.current({
      buttons: 1,
      clientX: 0,
      clientY: 0,
    } as WheelEvent);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(CURSOR_STATES[MouseButton.lmb]);
    expect(mockCallBack.mock.calls[1][0]).toStrictEqual({ x: 0, y: 0 });
  });
});
