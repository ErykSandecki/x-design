// mocks
import {
  childrenMock,
  elementMock,
  layoutMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// types
import { AlignmentFlow, LayoutType } from 'types';

// utils
import { handleChangeLayout } from '../handleChangeLayout';

describe('handleChangeLayout', () => {
  beforeEach(() => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    // before
    el1.setAttribute('id', 'test-1');
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', 'test-2');
    el2.style.height = '100px';
    el2.style.left = '100px';
    el2.style.top = '100px';
    el2.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);
  });

  it(`should return data with changed layout type`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeLayout(LayoutType.horizontal, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
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
            [elementMock.id]: {
              ...elementMock,
              children: [{ ...childrenMock, id: 'test-2' }],
              layout: {
                ...layoutMock,
                alignment: AlignmentFlow.topLeft,
                type: LayoutType.horizontal,
              },
            },
            ['test-2']: {
              ...elementMock,
              id: 'test-2',
              parentId: elementMock.id,
              position: 'relative',
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it(`should return data with changed layout type`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeLayout(LayoutType.freeForm, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: {
              ...elementMock,
              children: [{ ...childrenMock, id: 'test-2' }],
            },
            ['test-2']: {
              ...elementMock,
              id: 'test-2',
              parentId: elementMock.id,
              position: 'relative',
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
            [elementMock.id]: {
              ...elementMock,
              children: [{ ...childrenMock, id: 'test-2' }],
              layout: {
                ...layoutMock,
                alignment: undefined,
              },
            },
            ['test-2']: {
              ...elementMock,
              id: 'test-2',
              parentId: elementMock.id,
              position: 'absolute',
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
