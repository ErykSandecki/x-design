import { RefObject } from 'react';

// utils
import { getElementAngle } from '../getElementAngle';

const elementRef = {
  current: {
    getBoundingClientRect: () => ({ height: 100, left: 0, top: 0, width: 100 }),
  },
} as RefObject<HTMLDivElement>;

describe('getElementAngle', () => {
  it(`should return element angle`, () => {
    // before
    const result = getElementAngle(elementRef, {
      clientX: 0,
      clientY: 0,
    } as MouseEvent);

    // result
    expect(result).toBe(-135);
  });
});
