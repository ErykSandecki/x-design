import { RefObject } from 'react';

// mocks
import { elementAllDataMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';

// others
import { BASE_2D } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// utils
import { setElementsCoordinatesHandler } from '../setElementsCoordinatesHandler';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();
const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];

describe('setElementsCoordinatesHandler', () => {
  beforeAll(() => {
    // mock
    storeToMock.getState = (): any =>
      ({
        ...wholeStateMock,
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          pages: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages,
            [currentPage.id]: {
              ...currentPage,
              elements: {
                ...currentPage.elements,
                allData: {
                  ...currentPage.elements.allData,
                  [selectedElementMock.id]: {
                    ...elementAllDataMock,
                  },
                  ['test-2']: {
                    ...elementAllDataMock,
                    id: 'test-2',
                  },
                },
              },
              selectedElements: [selectedElementMock],
            },
          },
        },
      }) as any;
  });

  it(`should set coordinates`, () => {
    // before
    setElementsCoordinatesHandler(cursorPosition, mockCallBack, {
      clientX: 0,
      clientY: 0,
    } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      mode: 'dynamic',
    });
  });
});
