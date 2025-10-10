import { RefObject } from 'react';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';

// others
import { BASE_RECT } from 'shared';
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
const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];
const sharedRefs = {
  [elementMock.id]: element,
  ['test-2']: element,
};

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  defer: (callback: any): any => callback(),
}));

describe('getAbsolutePosition', () => {
  beforeAll(() => {
    // mock
    element.style.height = '100px';
    element.style.width = '100px';
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
                [selectedElementMock.id]: {
                  ...elementMock,
                },
                ['test-2']: {
                  ...elementMock,
                  id: 'test-2',
                },
              },
            },
          },
        },
      }) as any;
  });

  it(`should return coordinates`, () => {
    // before
    const result = getAbsolutePosition(elementMock.id, sharedRefs, zoomContentRef);

    // result
    expect(result).toStrictEqual({ x1: 0, x2: 100, y1: 0, y2: 100 });
  });

  it(`should return coordinates`, () => {
    // before
    const result = getAbsolutePosition('test-2', sharedRefs, zoomContentRef);

    // result
    expect(result).toStrictEqual({ x1: 0, x2: 100, y1: 0, y2: 100 });
  });

  it(`should not return coordinates`, () => {
    // before
    const result = getAbsolutePosition('-1', sharedRefs, zoomContentRef);

    // result
    expect(result).toStrictEqual(BASE_RECT);
  });
});
