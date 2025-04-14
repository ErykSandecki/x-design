// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  eventsMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleSetElementCoordinates } from '../handleSetElementCoordinates';

describe('handleSetElementCoordinates', () => {
  it(`should return data with changed element coordinates`, () => {
    // mock
    const coordinates = { x: 100, y: 100 };

    // before
    const result = handleSetElementCoordinates(
      elementAllDataMock.id,
      coordinates,
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        elements: {
          allData: {
            [elementAllDataMock.id]: elementAllDataMock,
          },
          dynamicData: {
            [elementDynamicDataMock.id]: elementDynamicDataMock,
          },
          staticData: {
            [elementStaticDataMock.id]: elementStaticDataMock,
          },
        },
      },
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
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
        staticData: {
          [elementStaticDataMock.id]: elementStaticDataMock,
        },
      },
    });
  });

  it(`should return data with not changed coordinates when event lock`, () => {
    // mock
    const coordinates = { x: 100, y: 100 };

    // before
    const result = handleSetElementCoordinates(
      elementAllDataMock.id,
      coordinates,
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        elements: {
          allData: {
            [elementAllDataMock.id]: elementAllDataMock,
          },
          dynamicData: {
            [elementDynamicDataMock.id]: elementDynamicDataMock,
          },
          staticData: {
            [elementStaticDataMock.id]: elementStaticDataMock,
          },
        },
        events: {
          ...eventsMock,
          canMoveElements: false,
        },
      },
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        allData: {
          [elementAllDataMock.id]: elementAllDataMock,
        },
        dynamicData: {
          [elementDynamicDataMock.id]: elementDynamicDataMock,
        },
        staticData: {
          [elementStaticDataMock.id]: elementStaticDataMock,
        },
      },
      events: {
        ...eventsMock,
        canMoveElements: false,
      },
    });
  });
});
