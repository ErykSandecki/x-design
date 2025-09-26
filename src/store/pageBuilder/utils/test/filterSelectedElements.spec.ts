// mocks
import {
  elementAllDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { filterSelectedElements } from '../filterSelectedElements';

describe('filterSelectedElements', () => {
  it(`should not filter when single element`, () => {
    // before
    const result = filterSelectedElements(
      [selectedElementMock],
      pageBuilderStateMock[PAGE_BUILDER],
    );

    // result
    expect(result).toStrictEqual([selectedElementMock]);
  });

  it(`should filter elements`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = filterSelectedElements(
      [
        selectedElementMock,
        {
          ...selectedElementMock,
          id: 'test-2',
          parentId: selectedElementMock.id,
        },
      ],
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              allData: {
                ...currentPage.elements.allData,
                [elementAllDataMock.id]: {
                  ...elementAllDataMock,
                  children: ['test-2'],
                },
                ['test-2']: {
                  ...elementAllDataMock,
                  children: [],
                  id: 'test-2',
                  parentId: elementAllDataMock.id,
                },
              },
            },
          },
        },
      },
    );

    // result
    expect(result).toStrictEqual([selectedElementMock]);
  });
});
