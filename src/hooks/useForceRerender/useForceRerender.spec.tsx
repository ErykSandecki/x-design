import { renderHook } from '@testing-library/react';

// hooks
import { useForceRerender } from './useForceRerender';

const mockCallBack = vi.fn();

vi.mock('react', async (importOriginal) => ({
  ...((await importOriginal()) as object),
  useState: (): any => [false, mockCallBack],
}));

describe('useForceRerender', () => {
  it(`should triiger event`, () => {
    // before
    renderHook(() => useForceRerender([]));

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
