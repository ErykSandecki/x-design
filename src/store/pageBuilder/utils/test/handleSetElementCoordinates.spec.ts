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
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleSetElementCoordinates(
      elementAllDataMock.id,
      coordinates,
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
                alignment: undefined,
                coordinates,
              },
            },
            dynamicData: {
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                alignment: undefined,
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

  it(`should return data with not changed coordinates when event lock`, () => {
    // mock
    const coordinates = { x: 100, y: 100 };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleSetElementCoordinates(
      elementAllDataMock.id,
      coordinates,
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
