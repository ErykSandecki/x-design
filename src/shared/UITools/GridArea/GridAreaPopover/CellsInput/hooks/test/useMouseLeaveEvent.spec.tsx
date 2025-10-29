import { renderHook } from '@testing-library/react';

// hooks
import { useMouseLeaveEvent } from '../useMouseLeaveEvent';

const mockCallBack = jest.fn();

describe('useMouseLeaveEvent', () => {
  it(`should handle trigger leave`, () => {
    // before
    const { result } = renderHook(() => useMouseLeaveEvent(mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ columns: 0, rows: 0 });
  });
});
