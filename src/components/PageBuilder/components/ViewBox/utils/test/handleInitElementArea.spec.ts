import { MouseEvent } from 'react';

// others
import { BASE_3D } from 'shared/ZoomBox/constants';

// types
import { MouseButton } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { handleInitElementArea } from '../handleInitElementArea';

const mockCallBack = jest.fn();

describe('handleInitElementArea', () => {
  it(`should init position of element`, () => {
    // before
    handleInitElementArea(
      BASE_3D,
      { buttons: MouseButton.lmb, clientX: 100, clientY: 100 } as MouseEvent,
      MouseMode.toolBeltA,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({
      x1: 100,
      x2: 100,
      y1: 100,
      y2: 100,
    });
  });

  it(`should not resize element`, () => {
    // before
    handleInitElementArea(
      BASE_3D,
      { buttons: MouseButton.idle, clientX: 100, clientY: 100 } as MouseEvent,
      MouseMode.toolBeltA,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
