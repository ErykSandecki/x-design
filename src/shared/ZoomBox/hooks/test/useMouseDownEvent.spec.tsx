import { renderHook } from '@testing-library/react';
import { WheelEvent } from 'react';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

// others
import { INITIAL_COORDINATES } from 'shared/ZoomBox/constants';

const mockCallBack = jest.fn();

describe('useMouseDownEvent', () => {
  it(`should save mouse position after trigger mouse down`, () => {
    // before
    const { result } = renderHook(() =>
      useMouseDownEvent(INITIAL_COORDINATES, mockCallBack),
    );

    // action
    result.current({
      clientX: 0,
      clientY: 0,
    } as WheelEvent);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ x: 0, y: 0 });
  });
});
