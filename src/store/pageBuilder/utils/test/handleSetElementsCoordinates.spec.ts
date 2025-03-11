import { cloneDeep } from 'lodash';

// mocks
import {
  allDataMock,
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
    allData: { [allDataMock.id]: allDataMock },
    dynamicData: { [elementDynamicDataMock.id]: elementDynamicDataMock },
    staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
  },
  selectedElements: {
    [selectedElementMock.id]: selectedElementMock,
  },
};

describe('handleSetElementsCoordinates', () => {
  it(`should return data with changed elements coordinates`, () => {
    // mock
    const coordinates = { x: 100, y: 100 };
    const prevState = cloneDeep(mockState);

    // before
    const result = handleSetElementsCoordinates(
      coordinates,
      prevState,
      mockState,
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        allData: {
          [allDataMock.id]: {
            ...allDataMock,
            positionAbsolute: coordinates,
            positionRelative: coordinates,
          },
        },
        dynamicData: {
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
            positionAbsolute: coordinates,
            positionRelative: coordinates,
          },
        },
        staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
      },
      selectedElements: {
        [selectedElementMock.id]: {
          ...selectedElementMock,
          coordinates: {
            x1: coordinates.x,
            x2: coordinates.x,
            y1: coordinates.y,
            y2: coordinates.y,
          },
        },
      },
    });
  });
});
