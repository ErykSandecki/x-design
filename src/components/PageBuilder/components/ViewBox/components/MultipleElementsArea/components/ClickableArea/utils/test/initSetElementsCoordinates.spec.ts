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

// utils
import { initSetElementsCoordinates } from '../initSetElementsCoordinates';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

describe('initSetElementsCoordinates', () => {
  it(`should trigger event`, () => {
    // mock
    storeToMock.getState = () =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          pages: {
            ...stateMock[PAGE_BUILDER].pages,
            ['0']: {
              ...stateMock[PAGE_BUILDER].pages['0'],
              selectedElements: [selectedElementMock],
            },
          },
        },
      }) as any;

    // before
    initSetElementsCoordinates(
      cursorPosition,
      mockCallBack,
      { clientX: 0, clientY: 0 } as MouseEvent,
      true,
    );

    // result
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      draggableElements: [selectedElementMock.id],
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
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
