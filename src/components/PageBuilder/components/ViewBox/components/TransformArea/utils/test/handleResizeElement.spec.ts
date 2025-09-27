import { RefObject } from 'react';

// mocks
import { selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_2D } from 'shared';

// types

// utils
import { handleResizeElement } from '../handleResizeElement';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();

describe('handleResizeElement', () => {
  it(`should resize element`, () => {
    // before
    handleResizeElement(
      cursorPosition,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      100,
      selectedElementMock.id,
      100,
      0,
      0,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      baseCoordinates: { x1: 0, x2: 100, y1: 0, y2: 100 },
      height: 100,
      id: 'test-1',
      mouseCoordinates: { x: 0, y: 0 },
      width: 100,
    });
  });
});
