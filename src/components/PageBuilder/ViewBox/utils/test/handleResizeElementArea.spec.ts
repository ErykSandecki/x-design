// others
import { BASE_3D } from 'shared/ZoomBox/constants';

// types
import { MouseButton } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { handleResizeElementArea } from '../handleResizeElementArea';
import { possibleElementMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

describe('handleResizeElementArea', () => {
  it(`should resize frame`, () => {
    // before
    handleResizeElementArea(
      BASE_3D,
      mockCallBack,
      { buttons: MouseButton.lmb, clientX: 100, clientY: 100 } as MouseEvent,
      MouseMode.toolBeltA,
      possibleElementMock,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload.possibleElement).toStrictEqual({
      parentId: '-1',
      x1: 0,
      x2: 100,
      y1: 0,
      y2: 100,
    });
  });

  it(`should not resize frame`, () => {
    // before
    handleResizeElementArea(
      BASE_3D,
      mockCallBack,
      { buttons: MouseButton.lmb, clientX: 100, clientY: 100 } as MouseEvent,
      MouseMode.default,
      possibleElementMock,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
