import { renderHook } from '@testing-library/react';

// core
import { PopoverRootProvider } from '../../../Popover/PopoverRoot/core/PopoverRootProvider';

// hooks
import { useForceHideOptions } from '../useForceHideOptions';

const mockCallBack = jest.fn();

describe('useForceHideOptions', () => {
  it(`should not force callback`, () => {
    // before
    renderHook(() => useForceHideOptions(false, mockCallBack));

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should force callback`, () => {
    // before
    renderHook(() => useForceHideOptions(true, mockCallBack), {
      wrapper: ({ children }) => (
        <PopoverRootProvider selected={false} setSelected={mockCallBack}>
          {children}
        </PopoverRootProvider>
      ),
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
