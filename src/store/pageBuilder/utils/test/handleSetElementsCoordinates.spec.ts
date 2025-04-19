import { cloneDeep } from 'lodash';

// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleSetElementsCoordinates } from '../handleSetElementsCoordinates';

const mockPage = {
  ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
  elements: {
    allData: { [elementAllDataMock.id]: elementAllDataMock },
    dynamicData: { [elementDynamicDataMock.id]: elementDynamicDataMock },
    staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
  },
  selectedElements: [selectedElementMock],
};

describe('handleSetElementsCoordinates', () => {
  it(`should return data with changed elements coordinates`, () => {
    // mock
    const coordinates = { x: 100, y: 100 };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const prevState = cloneDeep(mockPage);

    // before
    const result = handleSetElementsCoordinates(coordinates, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          ...mockPage,
          prevState,
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                coordinates,
              },
            },
            dynamicData: {
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                coordinates,
              },
            },
            staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
          },
          prevState,
          selectedElements: [
            {
              ...selectedElementMock,
              coordinates: {
                x1: coordinates.x,
                x2: coordinates.x,
                y1: coordinates.y,
                y2: coordinates.y,
              },
            },
          ],
        },
      },
    });
  });

  it(`should return data with not changed coordinates when event locked`, () => {
    // mock
    const coordinates = { x: 100, y: 100 };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const prevState = cloneDeep(mockPage);

    // before
    const result = handleSetElementsCoordinates(coordinates, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...pageBuilderStateMock[PAGE_BUILDER].events,
        canMoveElements: false,
      },
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          ...mockPage,
          prevState,
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...pageBuilderStateMock[PAGE_BUILDER].events,
        canMoveElements: false,
      },
      pages: {
        ['0']: {
          ...currentPage,
          ...mockPage,
          prevState,
          selectedElements: [],
        },
      },
    });
  });
});
