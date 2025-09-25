import { RefObject } from 'react';

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
    const result = getPosition(refItem, refPopover);

    // result
    expect(result).toStrictEqual({ left: 0, top: 100 });
  });
});
