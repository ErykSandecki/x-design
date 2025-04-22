// others
import { BASE_3D, BASE_RECT } from 'shared/ZoomBox/constants';

// types
import { MouseButton } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { handleResizeSelectableArea } from '../handleResizeSelectableArea';

const mockCallBack = jest.fn();

describe('handleResizeSelectableArea', () => {
  it(`should resize area`, () => {
    // before
    handleResizeSelectableArea(
      BASE_3D,
      { buttons: MouseButton.lmb, clientX: 100, clientY: 100 } as MouseEvent,
      MouseMode.default,
      BASE_RECT,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({
      x1: 0,
      x2: 100,
      y1: 0,
      y2: 100,
    });
  });

  it(`should not resize area`, () => {
    // before
    handleResizeSelectableArea(
      BASE_3D,
      { buttons: MouseButton.lmb, clientX: 100, clientY: 100 } as MouseEvent,
      MouseMode.default,
      null,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
