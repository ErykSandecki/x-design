import { renderHook } from '@testing-library/react';

// hooks
import { useHandleInitial } from '../useHandleInitial';

describe('useHandleInitial', () => {
  it(`should return data`, () => {
    // before
    renderHook(() => useHandleInitial());

    // result
    expect(document.body.style.pointerEvents).toBe('none');
  });
});
