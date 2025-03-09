import { RefObject } from 'react';

// others
import { BASE_2D } from 'shared';

// store
import { store as storeToMock } from 'store/store';

// types
import { T2DCoordinates } from 'types';

// utils
import { updateElementPosition } from '../updateElementPosition';
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();
const ref = { current: BASE_2D } as RefObject<T2DCoordinates>;

const stateMock = {
  ...pageBuilderStateMock,
};

describe('updateElementPosition', () => {
  beforeAll(() => {
    storeToMock.getState = () => stateMock as any;
  });

  it(`should update positions`, () => {
    // before
    updateElementPosition(
      ref,
      { clientX: 0, clientY: 0 } as MouseEvent,
      mockCallBack,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ x: 0, y: 0 });
    expect(mockCallBack.mock.calls[1][0]).toStrictEqual({ x: 0, y: 0 });
  });
});
