import { noop } from 'lodash';
import { renderHook } from '@testing-library/react';

// components
import { PopoverCompound } from 'shared/UITools/Popover/Popover';

// hooks
import { useCellsInputEvents } from '../useCellsInputEvents';

describe('useCellsInputEvents', () => {
  it(`should return data`, () => {
    // before
    const { result } = renderHook(() => useCellsInputEvents(noop), {
      wrapper: ({ children }) => (
        <PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
          {children}
        </PopoverCompound.PopoverRoot>
      ),
    });

    // result
    expect(result.current).toStrictEqual({
      activeCell: { columns: 0, rows: 0 },
      onClick: expect.any(Function),
      onMouseLeave: expect.any(Function),
      onMouseMove: expect.any(Function),
    });
  });
});
