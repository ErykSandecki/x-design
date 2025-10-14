import { RefObject } from 'react';

// mocks
import { flipMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_2D } from 'shared';

// utils
import { handleResizeElement } from '../handleResizeElement';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();

describe('handleResizeElement', () => {
  it(`should resize element`, () => {
    // before
    handleResizeElement(
      0,
      cursorPosition,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      flipMock,
      100,
      selectedElementMock.id,
      100,
      0,
      0,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      baseCoordinates: { x1: 0, x2: 100, y1: 0, y2: 100 },
      flip: flipMock,
      height: 100,
      id: 'test-1',
      mouseCoordinates: { x: 0, y: 0 },
      width: 100,
    });
  });

  it(`should resize when angle is 45`, () => {
    // before
    handleResizeElement(
      45,
      cursorPosition,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      flipMock,
      100,
      selectedElementMock.id,
      100,
      0,
      0,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      baseCoordinates: { x1: 0, x2: 100, y1: 0, y2: 100 },
      flip: flipMock,
      height: 100,
      id: 'test-1',
      mouseCoordinates: { x: 0, y: -0 },
      width: 100,
    });
  });

  it(`should resize when angle is -135`, () => {
    // before
    handleResizeElement(
      -135,
      cursorPosition,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      flipMock,
      100,
      selectedElementMock.id,
      100,
      0,
      0,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      baseCoordinates: { x1: 0, x2: 100, y1: 0, y2: 100 },
      flip: flipMock,
      height: 100,
      id: 'test-1',
      mouseCoordinates: { x: -0, y: 0 },
      width: 100,
    });
  });
});
