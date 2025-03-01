// others
import { BASE_3D } from 'shared/ZoomBox/constants';

// utils
import { handleScrollPage } from '../handleScrollPage';

const mockCallBack = jest.fn();

describe('handleScrollPage', () => {
  it('should not scroll page', () => {
    // before
    handleScrollPage(
      BASE_3D,
      { buttons: 1, deltaY: 1, metaKey: true } as React.WheelEvent,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it('should scroll page', () => {
    // before
    handleScrollPage(
      BASE_3D,
      { buttons: 0, deltaX: 1, deltaY: 1 } as React.WheelEvent,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ x: -1, y: -1, z: 1 });
  });
});
