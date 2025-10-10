import { renderHook } from '@testing-library/react';

// hooks
import { useClickEvent } from '../useClickEvent';

const mockCallBack = jest.fn();

describe('useClickEvent', () => {
  it(`should trigger event`, () => {
    // before
    const { result } = renderHook(() => useClickEvent(mockCallBack, mockCallBack));

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
    expect(mockCallBack.mock.calls[1][0]).toBe(false);
  });
});
