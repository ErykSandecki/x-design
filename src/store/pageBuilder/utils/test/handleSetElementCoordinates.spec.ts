// mocks
import {
  alignmetnMock,
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  eventsMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_2D } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleSetElementCoordinates } from '../handleSetElementCoordinates';

describe('handleSetElementCoordinates', () => {
  it(`should return data with changed element coordinates`, () => {
    // mock
    const coordinates = { x: 100, y: 100 };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleSetElementCoordinates(
      coordinates,
      elementAllDataMock.id,
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
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
        },
      },
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            allData: {
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                alignment: {},
                coordinates,
              },
            },
            dynamicData: {
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                alignment: {},
                coordinates,
              },
            },
            staticData: {
              [elementStaticDataMock.id]: elementStaticDataMock,
            },
          },
        },
      },
    });
  });

  it(`should return data with changed element coordinates when x & y are NaN`, () => {
    // mock
    const coordinates = { x: NaN, y: NaN };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleSetElementCoordinates(
      coordinates,
      elementAllDataMock.id,
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                [elementAllDataMock.id]: {
                  ...elementAllDataMock,
                  alignment: alignmetnMock,
                },
              },
              dynamicData: {
                [elementDynamicDataMock.id]: {
                  ...elementDynamicDataMock,
                  alignment: alignmetnMock,
                },
              },
              staticData: {
                [elementStaticDataMock.id]: elementStaticDataMock,
              },
            },
          },
        },
      },
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            allData: {
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                alignment: alignmetnMock,
                coordinates: BASE_2D,
              },
            },
            dynamicData: {
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                alignment: alignmetnMock,
                coordinates: BASE_2D,
              },
            },
            staticData: {
              [elementStaticDataMock.id]: elementStaticDataMock,
            },
          },
        },
      },
    });
  });

  it(`should return data with not changed coordinates when event lock`, () => {
    // mock
    const coordinates = { x: 100, y: 100 };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleSetElementCoordinates(
      coordinates,
      elementAllDataMock.id,
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          canMoveElements: false,
        },
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
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
        },
      },
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...eventsMock,
        canMoveElements: false,
      },
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
              },
            },
            dynamicData: {
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
              },
            },
            staticData: {
              [elementStaticDataMock.id]: elementStaticDataMock,
            },
          },
        },
      },
    });
  });
});
