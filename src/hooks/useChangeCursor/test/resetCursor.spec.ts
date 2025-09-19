import { RefObject } from 'react';

// utils
import { resetCursor } from '../utils';

const contentRef = {
  current: { style: { cursor: '' } },
} as RefObject<HTMLDivElement>;

describe('resetCursor', () => {
  it(`should reset cursor`, () => {
    // before
    resetCursor(contentRef, 'cursorDefault');

    // result
    expect(contentRef.current).toStrictEqual({
      style: { cursor: 'url(cursorDefault), auto' },
    });
  });
});
