import { renderHook } from '@testing-library/react';

// components
import { PopoverCompound } from 'shared/UITools/Popover/Popover';

// hooks
import { useClickEvent } from '../useClickEvent';

// others
import { SEPARATOR } from '../../constants';

const mockCallBack = jest.fn();

describe('useClickEvent', () => {
  it(`should handle click`, () => {
    // before
    const { result } = renderHook(() => useClickEvent(mockCallBack), {
      wrapper: ({ children }) => (
        <PopoverCompound.PopoverRoot selected={false} setSelected={mockCallBack}>
          {children}
        </PopoverCompound.PopoverRoot>
      ),
    });

    // action
    result.current({ target: { getAttribute: () => `1${SEPARATOR}1` } } as any);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ columns: 1, rows: 1 });
    expect(mockCallBack.mock.calls[1][0]).toBe(false);
  });

  it(`should not click`, () => {
    // before
    const { result } = renderHook(() => useClickEvent(mockCallBack), {
      wrapper: ({ children }) => (
        <PopoverCompound.PopoverRoot selected={false} setSelected={mockCallBack}>
          {children}
        </PopoverCompound.PopoverRoot>
      ),
    });

    // action
    result.current({ target: { getAttribute: () => undefined } } as any);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
