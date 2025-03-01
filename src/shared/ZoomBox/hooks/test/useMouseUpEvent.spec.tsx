import { fireEvent, renderHook } from '@testing-library/react';

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
    renderHook(() => useMouseUpEvent([], mockCallBack, mockCallBack));

    // action
    fireEvent.mouseUp(window, {
      clientX: 0,
      clientY: 0,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
    expect(mockCallBack.mock.calls[1][0]).toBe(CURSOR_STATES[MouseButton.idle]);
  });
});
