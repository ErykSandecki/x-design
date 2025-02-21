import { renderHook } from '@testing-library/react';
import { WheelEvent } from 'react';

// hooks
import { useMouseUpEvent } from '../useMouseUpEvent';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseButton } from 'types';

const mockCallBack = jest.fn();

describe('useMouseDownEvent', () => {
  it(`should change cursor to idle state`, () => {
    // before
    const { result } = renderHook(() => useMouseUpEvent(mockCallBack));

    // action
    result.current({
      clientX: 0,
      clientY: 0,
    } as WheelEvent);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(CURSOR_STATES[MouseButton.idle]);
  });
});
