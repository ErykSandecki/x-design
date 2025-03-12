import { RefObject } from 'react';

// others
import { BASE_2D } from 'shared';

// types
import { T2DCoordinates } from 'types';

// utils
import { setElementsCoordinatesHandler } from '../setElementsCoordinatesHandler';

jest.mock('store/pageBuilder/selectors', () => ({
  areaAxisSelectorCreator: () => () => 1,
}));

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();

describe('setElementsCoordinatesHandler', () => {
  it(`should set coordinates`, () => {
    // before
    setElementsCoordinatesHandler(cursorPosition, mockCallBack, {
      clientX: 0,
      clientY: 0,
    } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      x: 0,
      y: 0,
    });
  });
});
