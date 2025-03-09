import { RefObject } from 'react';

// others
import { BASE_2D, BASE_3D } from 'shared';

// types
import { T2DCoordinates } from 'types';

// utils
import { updateCursorPositionByElementPosition } from '../updateCursorPositionByElementPosition';

const ref = { current: BASE_2D } as RefObject<T2DCoordinates>;

describe('updateCursorPositionByElementPosition', () => {
  it(`should update cursor position`, () => {
    // before
    updateCursorPositionByElementPosition(
      ref,
      { x: 0, y: 0 },
      {
        clientX: 0,
        clientY: 0,
      } as MouseEvent,
      1,
    );

    // result
    expect(ref.current).toStrictEqual({ x: 0, y: 0 });
  });
});
