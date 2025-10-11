// mocks
import {
  childrenMock,
  elementMock,
  layoutMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// utils
import { getMappedElementsToMove } from '../getMappedElementsToMove';
import { LayoutType } from 'types';

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
    const payload = {
      draggableElements: [childrenMock],
      possibleIndexPosition: null,
      possibleParent: '-1',
    };

    // before
    const result = getMappedElementsToMove(false, payload, {
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
    const payload = {
      draggableElements: [{ ...childrenMock, id: 'test-2' }],
      possibleIndexPosition: null,
      possibleParent: '-1',
    };

    // before
    const result = getMappedElementsToMove(true, payload, {
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
    const payload = {
      draggableElements: [{ ...childrenMock, id: 'test-2' }],
      possibleIndexPosition: null,
      possibleParent: elementMock.id,
    };

    // before
    const result = getMappedElementsToMove(true, payload, {
      ...pageBuilderStateMock[PAGE_BUILDER],
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
    const payload = {
      draggableElements: [{ ...childrenMock, id: 'test-2' }],
      possibleIndexPosition: null,
      possibleParent: elementMock.id,
    };

    // before
    const result = getMappedElementsToMove(true, payload, {
      ...pageBuilderStateMock[PAGE_BUILDER],
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
        id: 'test-2',
        parentId: elementMock.id,
        position: 'relative',
      },
    });
  });
});
