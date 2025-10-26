// mocks
import { childrenMock, elementMock, eventsMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// utils
import { getMappedParentsChildren } from '../getMappedParentsChildren';

describe('getMappedParentsChildren', () => {
  it(`should get mapped parents when parent was not changed`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = getMappedParentsChildren(false, null, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...eventsMock,
        draggableElements: [childrenMock],
        possibleIndexPosition: null,
        possibleParent: '-1',
      },
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
              children: [],
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ['-1']: {
        ...currentPage.elements['-1'],
        children: [childrenMock],
      },
    });
  });

  it(`should get mapped parents when parent was changed`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = getMappedParentsChildren(true, null, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...eventsMock,
        draggableElements: [{ ...childrenMock, id: 'test-2' }],
        possibleIndexPosition: null,
        possibleParent: '-1',
      },
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
            },
            ['test-2']: {
              ...elementMock,
              children: [],
              id: 'test-2',
              parentId: elementMock.id,
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ['-1']: {
        ...currentPage.elements['-1'],
        children: [childrenMock, { ...childrenMock, id: 'test-2' }],
      },
      [elementMock.id]: {
        ...elementMock,
        children: [],
      },
    });
  });

  it(`should replace index position`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = getMappedParentsChildren(false, null, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...eventsMock,
        draggableElements: [{ ...childrenMock, id: 'test-3' }],
        possibleIndexPosition: 0,
        possibleParent: elementMock.id,
      },
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
              children: [
                { ...childrenMock, id: 'test-2' },
                { ...childrenMock, id: 'test-3' },
              ],
            },
            ['test-2']: {
              ...elementMock,
              children: [],
              id: 'test-2',
              parentId: elementMock.id,
            },
            ['test-3']: {
              ...elementMock,
              children: [],
              id: 'test-3',
              parentId: elementMock.id,
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      [elementMock.id]: {
        ...elementMock,
        children: [
          { ...childrenMock, id: 'test-3' },
          { ...childrenMock, id: 'test-2' },
        ],
      },
    });
  });

  it(`should replace index position and parent`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = getMappedParentsChildren(true, null, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...eventsMock,
        draggableElements: [{ ...childrenMock, id: 'test-3' }],
        possibleIndexPosition: 0,
        possibleParent: elementMock.id,
      },
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [childrenMock, { ...childrenMock, id: 'test-3' }],
            },
            [elementMock.id]: {
              ...elementMock,
              children: [{ ...childrenMock, id: 'test-2' }],
            },
            ['test-2']: {
              ...elementMock,
              children: [],
              id: 'test-2',
              parentId: elementMock.id,
            },
            ['test-3']: {
              ...elementMock,
              children: [],
              id: 'test-3',
              parentId: '-1',
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ['-1']: {
        ...currentPage.elements['-1'],
        children: [childrenMock],
      },
      [elementMock.id]: {
        ...elementMock,
        children: [
          { ...childrenMock, id: 'test-3' },
          { ...childrenMock, id: 'test-2' },
        ],
      },
    });
  });
});
