import { RefObject } from 'react';

// mocks
import {
  elementAllDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';

// others
import { BASE_2D, BASE_RECT } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// utils
import { getAbsolutePosition } from '../getAbsolutePosition';

const zoomContentRef = {
  current: {
    getBoundingClientRect: () => ({ height: 100, left: 0, top: 0, width: 100 }),
  },
} as RefObject<HTMLDivElement>;
const element = document.createElement('div');
const currentPage =
  pageBuilderStateMock[PAGE_BUILDER].pages[
    pageBuilderStateMock[PAGE_BUILDER].currentPage
  ];
const sharedRefs = {
  [elementAllDataMock.id]: element,
  ['2']: element,
};

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  defer: (callback: any) => callback(),
}));

describe('getAbsolutePosition', () => {
  beforeAll(() => {
    // mock
    element.style.height = '100px';
    element.style.width = '100px';
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

  it(`should return coordinates`, () => {
    // before
    const result = getAbsolutePosition(
      BASE_2D,
      elementAllDataMock.id,
      elementAllDataMock.parentId,
      sharedRefs,
      zoomContentRef,
    );

    // result
    expect(result).toStrictEqual({ x1: 0, x2: 100, y1: 0, y2: 100 });
  });

  it(`should return coordinates`, () => {
    // before
    const result = getAbsolutePosition(
      BASE_2D,
      '2',
      elementAllDataMock.id,
      sharedRefs,
      zoomContentRef,
    );

    // result
    expect(result).toStrictEqual({ x1: 0, x2: 100, y1: 0, y2: 100 });
  });

  it(`should not return coordinates`, () => {
    // before
    const result = getAbsolutePosition(
      BASE_2D,
      '-1',
      elementAllDataMock.id,
      sharedRefs,
      zoomContentRef,
    );

    // result
    expect(result).toStrictEqual(BASE_RECT);
  });
});
