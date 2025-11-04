// mocks
import {
  childrenMock,
  elementMock,
  eventsMock,
  layoutMock,
  pageBuilderStateMock,
  selectedElementMock,
  valueExtendMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// types
import { LayoutType } from 'types';

// utils
import { getMappedElementsToMove } from '../getMappedElementsToMove';

describe('getMappedElementsToMove', () => {
  beforeEach(() => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    // before
    el1.setAttribute('id', selectedElementMock.id);
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', 'test-2');
    el2.style.height = '100px';
    el2.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);
  });

  it(`should get mapped children when parent was not changed`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = getMappedElementsToMove(false, {
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
      [elementMock.id]: {
        ...elementMock,
        children: [],
      },
    });
  });

  it(`should get mapped children when parent was changed`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = getMappedElementsToMove(true, {
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
              id: 'test-2',
              parentId: elementMock.id,
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ['test-2']: {
        ...elementMock,
        children: [],
        id: 'test-2',
      },
    });
  });

  it(`should put element inside another element`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = getMappedElementsToMove(true, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...eventsMock,
        draggableElements: [{ ...childrenMock, id: 'test-2' }],
        possibleIndexPosition: null,
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
              children: [childrenMock, { ...childrenMock, id: 'test-2' }],
            },
            [elementMock.id]: {
              ...elementMock,
              children: [],
            },
            ['test-2']: {
              ...elementMock,
              id: 'test-2',
              parentId: '-1',
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ['test-2']: {
        ...elementMock,
        children: [],
        deepLevel: elementMock.deepLevel + 1,
        id: 'test-2',
        parentId: elementMock.id,
        position: 'absolute',
      },
    });
  });

  it(`should put element inside another element when parent grid`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = getMappedElementsToMove(true, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...eventsMock,
        draggableElements: [{ ...childrenMock, id: 'test-2' }],
        possibleIndexPosition: null,
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
              children: [childrenMock, { ...childrenMock, id: 'test-2' }],
            },
            [elementMock.id]: {
              ...elementMock,
              children: [],
              layout: {
                ...layoutMock,
                type: LayoutType.grid,
              },
            },
            ['test-2']: {
              ...elementMock,
              id: 'test-2',
              parentId: '-1',
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ['test-2']: {
        ...elementMock,
        children: [],
        deepLevel: elementMock.deepLevel + 1,
        height: { ...valueExtendMock, mode: 'auto', value: 100 },
        id: 'test-2',
        parentId: elementMock.id,
        position: 'relative',
        width: { ...valueExtendMock, mode: 'auto', unit: undefined, value: 100 },
      },
    });
  });
});
