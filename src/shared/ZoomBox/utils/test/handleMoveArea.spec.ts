import { RefObject } from 'react';

// others
import { BASE_2D, BASE_3D } from 'shared/ZoomBox/constants';
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseButton, T2DCoordinates } from 'types';

// utils
import { handleMoveArea } from '../handleMoveArea';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();

describe('handleMoveArea', () => {
  it('should move area', () => {
    // before
    handleMoveArea(
      BASE_3D,
      cursorPosition,
      CURSOR_STATES[4],
      { buttons: MouseButton.rmb, clientX: 0, clientY: 0 } as MouseEvent,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ x: 0, y: 0, z: 1 });
  });

  it('should not move area', () => {
    // before
    handleMoveArea(
      BASE_3D,
      cursorPosition,
      CURSOR_STATES[4],
      { clientX: 0, clientY: 0 } as MouseEvent,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
