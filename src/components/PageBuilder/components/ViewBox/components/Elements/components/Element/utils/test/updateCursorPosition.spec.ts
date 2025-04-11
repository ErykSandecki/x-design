import { RefObject } from 'react';

// others
import { BASE_2D } from 'shared';

// types
import { T2DCoordinates } from 'types';

// utils
import { updateCursorPosition } from '../updateCursorPosition';

const mockCallBack = jest.fn();
const ref = { current: BASE_2D } as RefObject<T2DCoordinates>;

jest.mock('../../../../../../utils/initSetElementsCoordinates', () => ({
  initSetElementsCoordinates: () => mockCallBack(),
}));

describe('updateCursorPosition', () => {
  it(`should update cursor position`, () => {
    // before
    updateCursorPosition(
      { x: 0, y: 0 },
      ref,
      mockCallBack,
      {
        clientX: 0,
        clientY: 0,
      } as MouseEvent,
      false,
      false,
    );

    // result
    expect(ref.current).toStrictEqual({ x: 0, y: 0 });
  });

  it(`should init set element coordinates`, () => {
    // before
    updateCursorPosition(
      { x: 0, y: 0 },
      ref,
      mockCallBack,
      {
        clientX: 0,
        clientY: 0,
      } as MouseEvent,
      true,
      true,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
