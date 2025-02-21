import { renderHook } from '@testing-library/react';
import { WheelEvent } from 'react';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { INITIAL_COORDINATES } from 'shared/ZoomBox/constants';

// types
import { MouseButton } from 'types';

const mockCallBack = jest.fn();

describe('useMouseMoveEvent', () => {
  it(`should change position after trigger mouse move`, () => {
    // before
    const { result } = renderHook(() =>
      useMouseMoveEvent(INITIAL_COORDINATES, INITIAL_COORDINATES, mockCallBack),
    );

    // action
    result.current({
      buttons: MouseButton.rmb,
      clientX: 0,
      clientY: 0,
    } as WheelEvent);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ x: 0, y: 0, z: 1 });
  });
});
