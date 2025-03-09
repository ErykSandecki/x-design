import { RefObject } from 'react';

// others
import { BASE_2D } from 'shared';

// types
import { T2DCoordinates } from 'types';

// utils
import { updateCursorPosition } from '../updateCursorPosition';

const ref = { current: BASE_2D } as RefObject<T2DCoordinates>;

describe('updateCursorPosition', () => {
  it(`should update cursor position`, () => {
    // before
    updateCursorPosition(
      ref,
      { clientX: 0, clientY: 0 } as MouseEvent,
      0,
      0,
      1,
    );

    // result
    expect(ref.current).toStrictEqual({ x: 0, y: 0 });
  });
});
