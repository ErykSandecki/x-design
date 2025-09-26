import { cloneDeep } from 'lodash';
import { RefObject } from 'react';

// mocks
import {
  elementAllDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// types
import { MouseButton, TObject, TRectCoordinates } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { calculateAbsolutePositions } from '../calculateAbsolutePositions';

const element = document.createElement('div');
const zoomContent = document.createElement('div');
const currentPage =
  pageBuilderStateMock[PAGE_BUILDER].pages[
    pageBuilderStateMock[PAGE_BUILDER].currentPage
  ];
const sharedRefs = {
  [elementAllDataMock.id]: element,
  ['test-2']: element,
};
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

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  defer: (callback: any): any => callback(),
}));

describe('calculateAbsolutePositions', () => {
  beforeAll(() => {
    // mock
    element.style.height = '500px';
    element.style.width = '500px';
    zoomContent.style.height = '1000px';
    zoomContent.style.width = '1000px';
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
            },
          },
        },
      }) as any;
  });

  it(`should change coordinates`, () => {
    // mock
    const clonedRectCoordinates = cloneDeep(rectCoordinates);

    // before
    calculateAbsolutePositions(
      { buttons: MouseButton.lmb } as MouseEvent,
      MouseMode.default,
      clonedRectCoordinates,
      sharedRefs,
      { current: zoomContent },
    );

    // result
    expect(clonedRectCoordinates.current).toStrictEqual({
      'test-1': { x1: 0, x2: 500, y1: 0, y2: 500 },
      'test-2': { x1: 0, x2: 500, y1: 0, y2: 500 },
    });
  });

  it(`should not change coordinates`, () => {
    // mock
    const clonedRectCoordinates = cloneDeep(rectCoordinates);

    // before
    calculateAbsolutePositions(
      { buttons: MouseButton.lmb } as MouseEvent,
      MouseMode.comment,
      clonedRectCoordinates,
      sharedRefs,
      { current: zoomContent },
    );

    // result
    expect(clonedRectCoordinates.current).toStrictEqual({
      'test-1': { x1: 0, x2: 100, y1: 0, y2: 100 },
    });
  });
});
