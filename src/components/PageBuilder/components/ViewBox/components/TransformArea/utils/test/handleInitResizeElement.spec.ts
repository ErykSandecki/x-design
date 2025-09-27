import { MouseEvent, RefObject } from 'react';

// others
import { BASE_2D } from 'shared';

// types

// utils
import { handleInitResizeElement } from '../handleInitResizeElement';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;

describe('handleInitResizeElement', () => {
  it(`should init cursor position`, () => {
    // before
    handleInitResizeElement(cursorPosition, {
      clientX: 100,
      clientY: 100,
    } as MouseEvent);

    // result
    expect(cursorPosition).toStrictEqual({ current: { x: 100, y: 100 } });
  });
});
