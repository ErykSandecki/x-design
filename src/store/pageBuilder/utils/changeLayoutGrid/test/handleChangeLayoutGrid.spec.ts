// mocks
import { elementMock, layoutMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// types
import { ElementType } from 'types';

// utils
import { handleChangeLayoutGrid } from '../handleChangeLayoutGrid';

describe('handleChangeLayoutGrid', () => {
  it(`should return data with changed gap type`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeLayoutGrid(
      { columns: 10 },
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              [elementMock.id]: elementMock,
            },
            selectedElements: [selectedElementMock],
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
            [elementMock.id]: {
              ...elementMock,
              children: Array.from(Array(10), () => ({ id: 'unknown', type: ElementType.grid })),
              layout: {
                ...layoutMock,
                grid: {
                  columns: 10,
                  rows: 1,
                },
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
