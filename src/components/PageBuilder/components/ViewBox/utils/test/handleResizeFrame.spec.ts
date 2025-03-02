// others
import { BASE_3D, BASE_RECT } from 'shared/ZoomBox/constants';

// types
import { MouseButton } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { handleResizeFrame } from '../handleResizeFrame';

const mockCallBack = jest.fn();

describe('handleResizeFrame', () => {
  it(`should resize frame`, () => {
    // before
    handleResizeFrame(
      BASE_3D,
      { buttons: MouseButton.lmb, clientX: 100, clientY: 100 } as MouseEvent,
      BASE_RECT,
      MouseMode.toolBeltA,
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

  it(`should not resize frame`, () => {
    // before
    handleResizeFrame(
      BASE_3D,
      { buttons: MouseButton.lmb, clientX: 100, clientY: 100 } as MouseEvent,
      null,
      MouseMode.toolBeltA,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
