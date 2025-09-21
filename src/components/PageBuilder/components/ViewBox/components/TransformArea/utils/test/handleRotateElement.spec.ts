import { RefObject } from 'react';

// utils
import { handleRotateElement } from '../handleRotateElement';

const cursorOffsetAngle = { current: 0 } as RefObject<number>;
const elementRef = {
  current: {
    getBoundingClientRect: () => ({ height: 100, left: 0, top: 0, width: 100 }),
  },
} as RefObject<HTMLDivElement>;
const mockCallBack = jest.fn();

describe('handleRotateElement', () => {
  it(`should rotate element`, () => {
    // before
    handleRotateElement(cursorOffsetAngle, mockCallBack, elementRef, {
      clientX: 100,
      clientY: 100,
    } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toBe(45);
  });
});
