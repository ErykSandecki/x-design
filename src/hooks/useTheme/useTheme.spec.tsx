import { renderHook } from '@testing-library/react';
import { useContext } from 'react';

// hooks
import { useTheme } from './useTheme';

// types
import { Theme } from 'types';
import type { Mock } from 'vitest';

vi.mock('react', async (importOriginal) => ({
  ...((await importOriginal()) as object),
  useContext: vi.fn(),
}));

describe('useTheme', () => {
  it('should return current theme', () => {
    // mock
    (useContext as Mock).mockImplementation(() => ({ setTheme: vi.fn(), theme: Theme.dark }));

    // before
    const { result } = renderHook(() => useTheme());

    // result
    expect(result.current.theme).toBe(Theme.dark);
  });

  it('should toggle from dark to light', () => {
    // mock
    const setTheme = vi.fn();

    (useContext as Mock).mockImplementation(() => ({ setTheme, theme: Theme.dark }));

    // before
    const { result } = renderHook(() => useTheme());

    // action
    result.current.toggleTheme();

    // result
    expect(setTheme).toHaveBeenCalledWith(Theme.light);
  });

  it('should toggle from light to dark', () => {
    // mock
    const setTheme = vi.fn();

    (useContext as Mock).mockImplementation(() => ({ setTheme, theme: Theme.light }));

    // before
    const { result } = renderHook(() => useTheme());

    // action
    result.current.toggleTheme();

    // result
    expect(setTheme).toHaveBeenCalledWith(Theme.dark);
  });
});
