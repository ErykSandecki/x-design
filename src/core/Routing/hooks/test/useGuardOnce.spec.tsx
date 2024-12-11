import { renderHook } from '@testing-library/react';

// hooks
import { useGuardOnce } from '../useGuardOnce';

const mockCallBack = jest.fn();

describe('useGuardOnce', () => {
  it('should return true when guard is watching', () => {
    // before
    const { result } = renderHook(() =>
      useGuardOnce(() => ({ condition: false, done: false })),
    );

    // result
    expect(result.current).toEqual(true);
  });

  it('should trigger before', () => {
    // before
    renderHook(() =>
      useGuardOnce(() => ({
        before: mockCallBack,
        condition: false,
        done: false,
      })),
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should return result when guard is not watching', () => {
    // before
    const { result } = renderHook(() =>
      useGuardOnce(() => ({ condition: false, done: true })),
    );

    // result
    expect(result.current).toEqual(false);
  });
});
