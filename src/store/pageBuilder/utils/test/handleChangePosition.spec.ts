// mocks
import {
  childrenMock,
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleChangePosition } from '../handleChangePosition';

describe('handleChangePosition', () => {
  beforeEach(() => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    const el3 = document.createElement('div');

    // before
    el1.setAttribute('id', selectedElementMock.id);
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', 'test-2');
    el2.style.height = '100px';
    el2.style.width = '100px';
    el3.setAttribute('id', 'test-3');
    el3.style.height = '100px';
    el3.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);
    document.body.appendChild(el3);
  });

  it(`should change on absolute position`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangePosition({
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
              children: [
                { ...childrenMock, id: 'test-2' },
                { ...childrenMock, id: 'test-3' },
              ],
              position: 'absolute',
            },
            ['test-2']: {
              ...elementMock,
              children: [],
              id: 'test-2',
              parentId: 'test-1',
              position: 'relative',
            },
            ['test-3']: {
              ...elementMock,
              children: [],
              id: 'test-3',
              parentId: 'test-1',
              position: 'relative',
            },
          },
          selectedElements: [{ ...selectedElementMock, id: 'test-2', parentId: 'test-1' }],
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
              children: [
                { ...childrenMock, id: 'test-3' },
                { ...childrenMock, id: 'test-2' },
              ],
              position: 'absolute',
            },
            ['test-2']: {
              ...elementMock,
              alignment: {},
              children: [],
              id: 'test-2',
              parentId: 'test-1',
              position: 'absolute',
            },
            ['test-3']: {
              ...elementMock,
              children: [],
              id: 'test-3',
              parentId: 'test-1',
              position: 'relative',
            },
          },
          selectedElements: [{ ...selectedElementMock, id: 'test-2', parentId: 'test-1' }],
        },
      },
    });
  });

  it(`should change on relative position`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangePosition({
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
              children: [
                { ...childrenMock, id: 'test-2' },
                { ...childrenMock, id: 'test-3' },
              ],
              position: 'absolute',
            },
            ['test-2']: {
              ...elementMock,
              children: [],
              id: 'test-2',
              parentId: 'test-1',
              position: 'relative',
            },
            ['test-3']: {
              ...elementMock,
              children: [],
              id: 'test-3',
              parentId: 'test-1',
              position: 'absolute',
            },
          },
          selectedElements: [{ ...selectedElementMock, id: 'test-3', parentId: 'test-1' }],
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
              children: [
                { ...childrenMock, id: 'test-2' },
                { ...childrenMock, id: 'test-3' },
              ],
              position: 'absolute',
            },
            ['test-2']: {
              ...elementMock,
              children: [],
              id: 'test-2',
              parentId: 'test-1',
              position: 'relative',
            },
            ['test-3']: {
              ...elementMock,
              alignment: {},
              children: [],
              id: 'test-3',
              parentId: 'test-1',
              position: 'relative',
            },
          },
          selectedElements: [
            {
              ...selectedElementMock,
              id: 'test-3',
              parentId: 'test-1',
              position: 'relative',
            },
          ],
        },
      },
    });
  });
});
