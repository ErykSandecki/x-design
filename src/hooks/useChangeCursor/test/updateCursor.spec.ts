import { RefObject } from 'react';

// utils
import { updateCursor } from '../utils';

const contentRef = {
  current: { style: { cursor: '' } },
} as RefObject<HTMLDivElement>;

describe('updateCursor', () => {
  it(`should update cursor`, () => {
    // before
    updateCursor(contentRef, 'cursor', 360);

    // result
    expect(contentRef.current).toStrictEqual({
      style: {
        cursor:
          "url(\"data:image/svg+xml,%0A%20%20%20%20%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'32'%20height%3D'32'%3E%0A%20%20%20%20%20%20%3Cimage%20href%3D'cursor'%20width%3D'32'%20height%3D'32'%20transform%3D'rotate(360%2016%2016)'%2F%3E%0A%20%20%20%20%3C%2Fsvg%3E\") 16 16, auto",
      },
    });
  });
});
