import { act, fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useWindowSize } from './useWindowSize';

const setWindowSize = (size: number): void => {
  window.innerHeight = size;
  window.innerWidth = size;
};

describe('useWindowSize', () => {
  it('should be correct innerHeight & innerWidth', () => {
    // before
    const { result } = renderHook(() => useWindowSize());

    // result
    expect(result.current).toEqual({ innerHeight: 768, innerWidth: 1024 });
  });

  it('should be correct innerHeight & innerWidth after resize', () => {
    // before
    const { result } = renderHook(() => useWindowSize());

    // action
    act(() => {
      setWindowSize(500);
      fireEvent(window, new Event('resize'));
    });

    // result
    expect(result.current).toEqual({ innerHeight: 500, innerWidth: 500 });
  });
});
