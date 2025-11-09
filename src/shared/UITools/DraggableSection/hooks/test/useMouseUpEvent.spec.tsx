import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useMouseUpEvent } from '../useMouseUpEvent';

const mockCallBack = jest.fn();

describe('useMouseUpEvent', () => {
  it(`should trigger event`, () => {
    // before
    renderHook(() => useMouseUpEvent(2, true, mockCallBack, mockCallBack));

    // action
    fireEvent.mouseUp(window, { target: { getAttribute: () => '0' } });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(false);
    expect(mockCallBack.mock.calls[1][0]).toBe(2);
    expect(mockCallBack.mock.calls[1][1]).toBe(0);
  });

  it(`should trigger event when value is NaN`, () => {
    // before
    renderHook(() => useMouseUpEvent(0, true, mockCallBack, mockCallBack));

    // action
    fireEvent.mouseUp(window, { target: { getAttribute: () => NaN } });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(false);
    expect(mockCallBack.mock.calls[1][0]).toBe(0);
    expect(mockCallBack.mock.calls[1][1]).toBe(-1);
  });

  it(`should not trigger event`, () => {
    // before
    renderHook(() => useMouseUpEvent(0, false, mockCallBack, mockCallBack));

    // action
    fireEvent.mouseUp(window, { target: { getAttribute: () => NaN } });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
