import { RefObject } from 'react';

// others
import { BASE_2D } from 'shared';

// types
import { T2DCoordinates } from 'types';

// utils
import { initSetElementsCoordinates } from '../initSetElementsCoordinates';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();

describe('initSetElementsCoordinates', () => {
  it(`should trigger event`, () => {
    // before
    initSetElementsCoordinates(
      cursorPosition,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      true,
    );

    // result
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      draggableElements: [],
      isMultipleMoving: true,
    });
  });

  it(`should not trigger event`, () => {
    // before
    initSetElementsCoordinates(
      cursorPosition,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      false,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
