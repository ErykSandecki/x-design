import { cloneDeep } from 'lodash';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_2D } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleSetElementsCoordinates } from '../handleSetElementsCoordinates';

const mockPage = {
  ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
  elements: {
    [elementMock.id]: elementMock,
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
    const result = handleSetElementsCoordinates(
      { coordinates, mode: 'dynamic' },
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            ...mockPage,
            prevState,
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
            [elementMock.id]: {
              ...elementMock,
              alignment: {},
              coordinates,
            },
          },
          prevState,
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it(`should return data with changed elements coordinates`, () => {
    // mock
    const coordinates = { x: NaN, y: NaN };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const prevState = cloneDeep(mockPage);

    // before
    const result = handleSetElementsCoordinates(
      { coordinates, mode: 'dynamic' },
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            ...mockPage,
            prevState,
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
            [elementMock.id]: {
              ...elementMock,
              alignment: {},
              coordinates: BASE_2D,
            },
          },
          prevState,
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it(`should return data with changed elements coordinates when static mode`, () => {
    // mock
    const coordinates = { x: 100, y: 100 };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleSetElementsCoordinates(
      { coordinates, mode: 'static' },
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            ...mockPage,
            prevState: undefined,
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
            [elementMock.id]: {
              ...elementMock,
              alignment: {},
              coordinates,
            },
          },
          prevState: undefined,
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it(`should return data with changed elements coordinates when static mode and nan values`, () => {
    // mock
    const coordinates = { x: NaN, y: NaN };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleSetElementsCoordinates(
      { coordinates, mode: 'static' },
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            ...mockPage,
            prevState: undefined,
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
            [elementMock.id]: {
              ...elementMock,
              alignment: {},
              coordinates: BASE_2D,
            },
          },
          prevState: undefined,
          selectedElements: [selectedElementMock],
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
    const result = handleSetElementsCoordinates(
      { coordinates, mode: 'dynamic' },
      {
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
      },
    );

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
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
