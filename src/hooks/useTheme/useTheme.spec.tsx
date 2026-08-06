import { renderHook } from '@testing-library/react';
import { useContext } from 'react';

// hooks
import { useTheme } from './useTheme';

// types
import { Theme } from 'types';

jest.mock('react', () => ({
  ...(jest.requireActual('react') as object),
  useContext: jest.fn(),
}));

describe('useTheme', () => {
  it('should return current theme', () => {
    // mock
    (useContext as jest.Mock).mockImplementation(() => ({ setTheme: jest.fn(), theme: Theme.dark }));

    // before
    const { result } = renderHook(() => useTheme());

    // result
    expect(result.current.theme).toBe(Theme.dark);
  });

  it('should toggle from dark to light', () => {
    // mock
    const setTheme = jest.fn();

    (useContext as jest.Mock).mockImplementation(() => ({ setTheme, theme: Theme.dark }));

    // before
    const { result } = renderHook(() => useTheme());

    // action
    result.current.toggleTheme();

    // result
    expect(setTheme).toHaveBeenCalledWith(Theme.light);
  });

  it('should toggle from light to dark', () => {
    // mock
    const setTheme = jest.fn();

    (useContext as jest.Mock).mockImplementation(() => ({ setTheme, theme: Theme.light }));

    // before
    const { result } = renderHook(() => useTheme());

    // action
    result.current.toggleTheme();

    // result
    expect(setTheme).toHaveBeenCalledWith(Theme.dark);
  });
});
