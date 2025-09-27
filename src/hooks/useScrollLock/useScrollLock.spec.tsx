import { noop } from 'lodash';
import { renderHook } from '@testing-library/react';
import { useContext } from 'react';

// hooks
import { useScrollLock } from './useScrollLock';

const mockCallBack = jest.fn();

jest.mock('react', () => ({
  ...(jest.requireActual('react') as object),
  useContext: jest.fn(),
}));

describe('useScrollLock', () => {
  it(`should return scroll lock state`, () => {
    // mock
    (useContext as jest.Mock).mockImplementation(() => ({
      scrollLock: false,
      setScrollLock: noop,
    }));

    // before
    const { result } = renderHook(() => useScrollLock());

    // result
    expect(result.current.scrollLock).toBe(false);
  });

  it(`should return lock html and body`, () => {
    // mock
    (useContext as jest.Mock).mockImplementation(() => ({
      scrollLock: true,
      setScrollLock: noop,
    }));

    // before
    const { result } = renderHook(() => useScrollLock());

    // action
    result.current.setScrollLock(true);

    // result
    expect(document.getElementsByTagName('html')[0].style.overflow).toBe('hidden');
  });

  it(`should trigger lock function`, () => {
    // mock
    (useContext as jest.Mock).mockImplementation(() => ({
      scrollLock: true,
      setScrollLock: mockCallBack,
    }));

    // before
    const { result } = renderHook(() => useScrollLock());

    // action
    result.current.setScrollLock(true);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
