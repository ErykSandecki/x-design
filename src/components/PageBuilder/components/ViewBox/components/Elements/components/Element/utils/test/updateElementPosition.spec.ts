import { RefObject } from 'react';

// mocks
import {
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_2D } from 'shared';

// store
import { store as storeToMock } from 'store/store';

// types
import { T2DCoordinates } from 'types';

// utils
import { updateElementPosition } from '../updateElementPosition';

const mockCallBack = jest.fn();
const ref = { current: BASE_2D } as RefObject<T2DCoordinates>;
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
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload.coordinates).toStrictEqual({
      x: 0,
      y: 0,
    });
  });

  it(`should set elements coordinates`, () => {
    // before
    updateElementPosition(
      ref,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      selectedElementMock.id,
      true,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
