import { RefObject } from 'react';

// mocks
import {
  elementAllDataMock,
  eventsMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// types
import { KeyboardKeys, TObject, TRectCoordinates } from 'types';

// utils
import { getCollidedElements } from '../getCollidedElements';

const currentPage =
  pageBuilderStateMock[PAGE_BUILDER].pages[
    pageBuilderStateMock[PAGE_BUILDER].currentPage
  ];

const rectCoordinates = {
  current: {
    [elementAllDataMock.id]: {
      x1: elementAllDataMock.coordinates.x,
      x2: elementAllDataMock.width.value,
      y1: elementAllDataMock.coordinates.y,
      y2: elementAllDataMock.height.value,
    },
  },
} as RefObject<TObject<TRectCoordinates>>;

describe('getCollidedElements', () => {
  beforeAll(() => {
    storeToMock.getState = () =>
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
                  ['2']: {
                    ...elementAllDataMock,
                    id: '2',
                  },
                },
              },
            },
          },
        },
      }) as any;
  });

  it(`should return collided elements`, () => {
    // before
    const result = getCollidedElements(rectCoordinates, {
      x1: 0,
      x2: 100,
      y1: 0,
      y2: 100,
    });

    // result
    expect(result).toStrictEqual([selectedElementMock]);
  });

  it(`should return collided elements`, () => {
    // before
    const result = getCollidedElements(rectCoordinates, {
      x1: 100,
      x2: 0,
      y1: 100,
      y2: 0,
    });

    // result
    expect(result).toStrictEqual([selectedElementMock]);
  });

  it(`should not return any collided elements`, () => {
    // before
    const result = getCollidedElements(rectCoordinates, {
      x1: 200,
      x2: 300,
      y1: 200,
      y2: 300,
    });

    // result
    expect(result).toStrictEqual([]);
  });

  it(`should return collided elements which are inside area`, () => {
    // mock
    storeToMock.getState = () =>
      ({
        ...wholeStateMock,
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          events: { ...eventsMock, pressedKey: KeyboardKeys.control },
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
                  ['2']: {
                    ...elementAllDataMock,
                    id: '2',
                  },
                },
              },
            },
          },
        },
      }) as any;

    // before
    const result = getCollidedElements(rectCoordinates, {
      x1: 0,
      x2: 100,
      y1: 0,
      y2: 100,
    });

    // result
    expect(result).toStrictEqual([selectedElementMock]);
  });

  it(`should return collided elements in the same structure when new one was added`, () => {
    // mock
    storeToMock.getState = () =>
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
                  ['2']: {
                    ...elementAllDataMock,
                    id: '2',
                  },
                },
              },
              selectedElements: [{ ...selectedElementMock, id: '2' }],
            },
          },
        },
      }) as any;

    // before
    const result = getCollidedElements(
      {
        current: {
          [elementAllDataMock.id]: {
            x1: elementAllDataMock.coordinates.x,
            x2: elementAllDataMock.width,
            y1: elementAllDataMock.coordinates.y,
            y2: elementAllDataMock.height,
          },
          ['2']: {
            x1: elementAllDataMock.coordinates.x,
            x2: elementAllDataMock.width as number,
            y1: elementAllDataMock.coordinates.y,
            y2: elementAllDataMock.height as number,
          },
        },
      } as RefObject<TObject<TRectCoordinates>>,
      {
        x1: 0,
        x2: 100,
        y1: 0,
        y2: 100,
      },
    );

    // result
    expect(result).toStrictEqual([
      { ...selectedElementMock, id: '2' },
      selectedElementMock,
    ]);
  });
});
