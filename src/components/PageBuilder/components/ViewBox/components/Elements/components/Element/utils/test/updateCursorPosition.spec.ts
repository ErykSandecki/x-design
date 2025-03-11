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
import { updateCursorPosition } from '../updateCursorPosition';

const mockCallBack = jest.fn();
const ref = { current: BASE_2D } as RefObject<T2DCoordinates>;
const prevState = {
  current: pageBuilderStateMock[PAGE_BUILDER],
} as RefObject<TPageBuilderState>;

jest.mock('../../../../../../utils/initSetElementsCoordinates', () => ({
  initSetElementsCoordinates: () => mockCallBack(),
}));

describe('updateCursorPosition', () => {
  it(`should update cursor position`, () => {
    // before
    updateCursorPosition(
      ref,
      mockCallBack,
      { x: 0, y: 0 },
      {
        clientX: 0,
        clientY: 0,
      } as MouseEvent,
      false,
      false,
      prevState,
    );

    // result
    expect(ref.current).toStrictEqual({ x: 0, y: 0 });
  });

  it(`should init set element coordinates`, () => {
    // before
    updateCursorPosition(
      ref,
      mockCallBack,
      { x: 0, y: 0 },
      {
        clientX: 0,
        clientY: 0,
      } as MouseEvent,
      true,
      true,
      prevState,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
