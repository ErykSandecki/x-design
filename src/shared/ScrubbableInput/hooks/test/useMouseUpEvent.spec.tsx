import { renderHook } from '@testing-library/react';

// hooks
import { useMouseUpEvent } from '../useMouseUpEvent';

const mockCallBack = jest.fn();

describe('useMouseUpEvent', () => {
  it(`should triiger event`, () => {
    // before
    const { result } = renderHook(() => useMouseUpEvent(mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
