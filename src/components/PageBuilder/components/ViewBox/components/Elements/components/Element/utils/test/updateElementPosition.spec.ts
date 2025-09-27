import { RefObject } from 'react';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_2D } from 'shared';

// store
import { store as storeToMock } from 'store/store';

// types

// utils
import { updateElementPosition } from '../updateElementPosition';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('../../../../../../utils/setElementsCoordinatesHandler', () => ({
  setElementsCoordinatesHandler: (): any => mockCallBack(),
}));

describe('updateElementPosition', () => {
  beforeAll(() => {
    storeToMock.getState = (): any => stateMock as any;
  });

  it(`should update positions`, () => {
    // before
    updateElementPosition(cursorPosition, mockCallBack, { clientX: 0, clientY: 0 } as MouseEvent, '-1');

    // result
    expect(mockCallBack.mock.calls[0][0].payload.coordinates).toStrictEqual({
      x: 0,
      y: 0,
    });
  });

  it(`should set elements coordinates`, () => {
    // before
    updateElementPosition(cursorPosition, mockCallBack, { clientX: 0, clientY: 0 } as MouseEvent, '-1');

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
