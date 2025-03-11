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
import { initSetElementsCoordinates } from '../initSetElementsCoordinates';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();
const prevState = {
  current: pageBuilderStateMock[PAGE_BUILDER],
} as RefObject<TPageBuilderState>;

describe('initSetElementsCoordinates', () => {
  it(`should trigger event`, () => {
    // before
    initSetElementsCoordinates(
      cursorPosition,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      true,
      prevState,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      isMultipleMoving: true,
    });
  });

  it(`should not trigger event`, () => {
    // before
    initSetElementsCoordinates(
      cursorPosition,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      false,
      prevState,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
