import { RefObject } from 'react';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_2D } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// types
import { T2DCoordinates } from 'types';
import { TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { setElementsCoordinatesHandler } from '../setElementsCoordinatesHandler';

jest.mock('store/pageBuilder/selectors', () => ({
  areaAxisSelectorCreator: () => () => 1,
}));

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();
const prevState = {
  current: pageBuilderStateMock[PAGE_BUILDER],
} as RefObject<TPageBuilderState>;

describe('setElementsCoordinatesHandler', () => {
  it(`should set coordinates`, () => {
    // before
    setElementsCoordinatesHandler(
      cursorPosition,
      mockCallBack,
      {
        clientX: 0,
        clientY: 0,
      } as MouseEvent,
      prevState,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload.coordinates).toStrictEqual({
      x: 0,
      y: 0,
    });
    expect(mockCallBack.mock.calls[0][0].payload.prevState).toStrictEqual(
      prevState.current,
    );
  });
});
