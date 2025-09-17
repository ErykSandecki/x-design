import { MouseEvent, RefObject } from 'react';

// utils
import { handleInitRotateElement } from '../handleInitRotateElement';

const cursorBaseAngle = { current: 0 } as RefObject<number>;
const elementRef = {
  current: {
    getBoundingClientRect: () => ({ height: 100, left: 0, top: 0, width: 100 }),
  },
} as RefObject<HTMLDivElement>;

describe('handleInitRotateElement', () => {
  it(`should init current angle`, () => {
    // before
    handleInitRotateElement(cursorBaseAngle, elementRef, {
      clientX: 100,
      clientY: 100,
    } as MouseEvent);

    // result
    expect(cursorBaseAngle).toStrictEqual({ current: 45 });
  });
});
