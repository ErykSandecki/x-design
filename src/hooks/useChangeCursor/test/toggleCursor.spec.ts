import { RefObject } from 'react';

// utils
import { toggleCursor } from '../utils';

const contentRef = {
  current: { style: { cursor: '' } },
} as RefObject<HTMLDivElement>;

describe('toggleCursor', () => {
  it(`should toggle cursor`, () => {
    // before
    toggleCursor(contentRef, 'cursor');

    // result
    expect(contentRef.current).toStrictEqual({
      style: { cursor: 'cursor' },
    });
  });
});
