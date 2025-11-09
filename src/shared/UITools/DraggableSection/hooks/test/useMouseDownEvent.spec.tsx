import { renderHook } from '@testing-library/react';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

const mockCallBack = jest.fn();

describe('useMouseDownEvent', () => {
  it(`should trigger event`, () => {
    // before
    const { result } = renderHook(() => useMouseDownEvent(mockCallBack, mockCallBack, mockCallBack));

    // action
    result.current(0);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(0);
    expect(mockCallBack.mock.calls[1][0]).toBe(true);
    expect(mockCallBack.mock.calls[2][0]).toBe(true);
  });
});
