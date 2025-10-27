import { RefObject } from 'react';

// types
import { AlignPopoverHorizontally, AlignPopoverVertically } from '../../enums';

// utils
import { getPosition } from '../getPosition';

const refItem = {
  current: {
    getBoundingClientRect: () => ({ height: 100, left: 100, top: 100 }),
  },
} as RefObject<HTMLElement>;
const refPopover = {
  current: { getBoundingClientRect: () => ({ height: 100, width: 100 }) },
} as RefObject<HTMLElement>;

describe('getPosition', () => {
  it('should return position', () => {
    // before
    const result = getPosition(AlignPopoverHorizontally.right, AlignPopoverVertically.center, refItem, refPopover);

    // result
    expect(result).toStrictEqual({ left: 0, top: 100 });
  });

  it('should return position when left & top', () => {
    // before
    const result = getPosition(AlignPopoverHorizontally.left, AlignPopoverVertically.top, refItem, refPopover);

    // result
    expect(result).toStrictEqual({ left: 100, top: 100 });
  });
});
