// mocks
import {
  childrenMock,
  elementMock,
  eventsMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// utils
import { handleChangeParent } from '../handleChangeParent';

describe('handleChangeParent', () => {
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

  it(`should not change parent when possible parent is null`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeParent({
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...eventsMock,
        draggableElements: [childrenMock],
        possibleIndexPosition: null,
        possibleParent: null,
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
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });

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
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it(`should change parent`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeParent({
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
          selectedElements: [{ ...selectedElementMock, id: 'test-2' }],
        },
      },
    });

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
              children: [childrenMock, { ...childrenMock, id: 'test-2' }],
            },
            [elementMock.id]: {
              ...elementMock,
              children: [],
            },
            ['test-2']: {
              ...elementMock,
              children: [],
              id: 'test-2',
              parentId: '-1',
            },
          },
          selectedElements: [{ ...selectedElementMock, id: 'test-2', parentId: '-1' }],
        },
      },
    });
  });

  it(`should change parent when element is put inside another element`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeParent({
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...eventsMock,
        draggableElements: [{ ...childrenMock, id: 'test-2' }],
        possibleIndexPosition: null,
        possibleParent: 'test-1',
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
              children: [],
              id: 'test-2',
              parentId: '-1',
            },
          },
          selectedElements: [{ ...selectedElementMock, id: 'test-2' }],
        },
      },
    });

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
            },
            ['test-2']: {
              ...elementMock,
              deepLevel: elementMock.deepLevel + 1,
              id: 'test-2',
              parentId: elementMock.id,
              position: 'absolute',
            },
          },
          selectedElements: [
            {
              ...selectedElementMock,
              id: 'test-2',
              parentId: 'test-1',
              position: 'absolute',
            },
          ],
        },
      },
    });
  });
});
