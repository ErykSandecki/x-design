import { renderHook } from '@testing-library/react';

// hooks
import { useMouseLeaveEvent } from '../useMouseLeaveEvent';

const mockCallBack = jest.fn();

describe('useMouseLeaveEvent', () => {
  it(`should trigger event on resize`, () => {
    // before
    const { result } = renderHook(() => useMouseLeaveEvent(false, false, mockCallBack, mockCallBack));

    // action
    result.current.onMouseLeaveAnchorResize();

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should trigger event on rotate`, () => {
    // before
    const { result } = renderHook(() => useMouseLeaveEvent(false, false, mockCallBack, mockCallBack));

    // action
    result.current.onMouseLeaveAnchorRotate();

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should not trigger any events`, () => {
    // before
    const { result } = renderHook(() => useMouseLeaveEvent(true, true, mockCallBack, mockCallBack));

    // action
    result.current.onMouseLeaveAnchorResize();
    result.current.onMouseLeaveAnchorRotate();

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
