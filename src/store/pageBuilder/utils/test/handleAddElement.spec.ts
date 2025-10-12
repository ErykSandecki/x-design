// mocks
import {
  childrenMock,
  createFrameMock,
  elementMock,
  layoutMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// types
import { LayoutType } from 'types';

// utils
import { handleAddElement } from '../handleAddElement';

describe('handleAddElement', () => {
  it(`should return data with added element`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleAddElement(createFrameMock, pageBuilderStateMock[PAGE_BUILDER]);

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [childrenMock],
            },
            [createFrameMock.id]: createFrameMock,
          },
        },
      },
    });
  });

  it(`should return data with added element inside element when layout is not free form`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleAddElement(
      { ...createFrameMock, id: 'test-2', parentId: 'test-1' },
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                children: [childrenMock],
              },
              [elementMock.id]: {
                ...elementMock,
                layout: {
                  ...layoutMock,
                  type: LayoutType.vertical,
                },
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
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [childrenMock],
            },
            [elementMock.id]: {
              ...elementMock,
              children: [{ ...childrenMock, id: 'test-2' }],
              layout: {
                ...layoutMock,
                type: LayoutType.vertical,
              },
            },
            ['test-2']: {
              ...createFrameMock,
              deepLevel: 1,
              id: 'test-2',
              parentId: 'test-1',
              position: 'relative',
            },
          },
        },
      },
    });
  });
});
