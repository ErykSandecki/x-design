import { RefObject } from 'react';

// mocks
import {
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_2D } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// types
import { T2DCoordinates } from 'types';
import { TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { updateElementPosition } from '../updateElementPosition';

const mockCallBack = jest.fn();
const ref = { current: BASE_2D } as RefObject<T2DCoordinates>;
const prevState = {
  current: pageBuilderStateMock[PAGE_BUILDER],
} as RefObject<TPageBuilderState>;
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('../../../../../../utils/setElementsCoordinatesHandler', () => ({
  setElementsCoordinatesHandler: () => mockCallBack(),
}));

describe('updateElementPosition', () => {
  beforeAll(() => {
    storeToMock.getState = () => stateMock as any;
  });

  it(`should update positions`, () => {
    // before
    updateElementPosition(
      ref,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      selectedElementMock.id,
      false,
      prevState,
    );

    // result
    expect(
      mockCallBack.mock.calls[0][0].payload.positionAbsolute,
    ).toStrictEqual({ x: 0, y: 0 });
  });

  it(`should set elements coordinates`, () => {
    // before
    updateElementPosition(
      ref,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      selectedElementMock.id,
      true,
      prevState,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
