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

const mockState = {
  ...pageBuilderStateMock[PAGE_BUILDER],
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
    const prevState = cloneDeep(mockState);

    // before
    const result = handleSetElementsCoordinates(coordinates, {
      ...mockState,
      prevState,
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
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
    });
  });

  it(`should return data with not changed coordinates when event locked`, () => {
    // mock
    const coordinates = { x: 100, y: 100 };
    const prevState = cloneDeep(mockState);

    // before
    const result = handleSetElementsCoordinates(coordinates, {
      ...mockState,
      events: {
        ...mockState.events,
        canMoveElements: false,
      },
      prevState,
    });

    // result
    expect(result).toStrictEqual({
      ...mockState,
      events: {
        ...mockState.events,
        canMoveElements: false,
      },
      prevState,
      selectedElements: [],
    });
  });
});
