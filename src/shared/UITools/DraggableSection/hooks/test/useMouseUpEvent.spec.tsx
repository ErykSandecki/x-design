import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useMouseUpEvent } from '../useMouseUpEvent';

const mockCallBack = jest.fn();

describe('useMouseUpEvent', () => {
  it(`should trigger event`, () => {
    // before
    renderHook(() => useMouseUpEvent(2, true, mockCallBack, mockCallBack, mockCallBack, mockCallBack));

    // action
    fireEvent.mouseUp(window, { target: { getAttribute: () => '0' } });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(2);
    expect(mockCallBack.mock.calls[0][1]).toBe(0);
    expect(mockCallBack.mock.calls[1][0]).toBe(0);
    expect(mockCallBack.mock.calls[2][0]).toBe(false);
    expect(mockCallBack.mock.calls[3][0]).toBe(false);
  });

  it(`should trigger some events when value is NaN`, () => {
    // before
    renderHook(() => useMouseUpEvent(0, true, mockCallBack, mockCallBack, mockCallBack, mockCallBack));

    // action
    fireEvent.mouseUp(window, { target: { getAttribute: () => NaN } });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(false);
    expect(mockCallBack.mock.calls[1][0]).toBe(false);
  });
});
