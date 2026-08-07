// mocks
import {
  childrenMock,
  createFrameMock,
  elementMock,
  layoutMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../slice';

// types
import { LayoutType } from 'types';

// utils
import { handleAddElement } from '../handleAddElement';

describe('handleAddElement', () => {
  it(`should return data with added element`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const state = {
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: { ...pageBuilderStateMock[PAGE_BUILDER].events },
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: { ...currentPage.elements },
        },
      },
    };

    // action
    handleAddElement(createFrameMock, state);

    // result
    expect(state).toStrictEqual({
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
    const state = {
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: { ...pageBuilderStateMock[PAGE_BUILDER].events },
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
    };

    // action
    handleAddElement({ ...createFrameMock, id: 'test-2', parentId: 'test-1' }, state);

    // result
    expect(state).toStrictEqual({
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
