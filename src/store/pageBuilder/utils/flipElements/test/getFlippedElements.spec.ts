// mocks
import {
  childrenMock,
  elementMock,
  flipMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// types
import { LayoutType } from 'types';

// utils
import { getFlippedElements } from '../getFlippedElements';
import { negateValue } from 'utils/math/negateValue';

describe('getFlippedElements', () => {
  it(`should get fliped elements for axis x`, () => {
    // mock
    const angle = 45;
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = getFlippedElements('x', {
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
              angle,
              children: [
                { ...childrenMock, id: 'test-2' },
                { ...childrenMock, id: 'test-3' },
              ],
              layout: {
                type: LayoutType.horizontal,
              },
            },
            ['test-2']: {
              ...elementMock,
              id: 'test-2',
              parentId: 'test-1',
            },
            ['test-3']: {
              ...elementMock,
              id: 'test-3',
              parentId: 'test-1',
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...currentPage.elements,
      ['-1']: {
        ...currentPage.elements['-1'],
        children: [childrenMock],
      },
      [elementMock.id]: {
        ...elementMock,
        angle: negateValue(angle),
        children: [
          { ...childrenMock, id: 'test-3' },
          { ...childrenMock, id: 'test-2' },
        ],
        flip: {
          ...flipMock,
          x: true,
        },
        layout: {
          type: LayoutType.horizontal,
        },
      },
      ['test-2']: {
        ...elementMock,
        id: 'test-2',
        parentId: 'test-1',
      },
      ['test-3']: {
        ...elementMock,
        id: 'test-3',
        parentId: 'test-1',
      },
    });
  });

  it(`should get fliped elements for axis y`, () => {
    // mock
    const angle = 45;
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = getFlippedElements('y', {
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
              angle,
              children: [
                { ...childrenMock, id: 'test-2' },
                { ...childrenMock, id: 'test-3' },
              ],
            },
            ['test-2']: {
              ...elementMock,
              id: 'test-2',
              parentId: 'test-1',
            },
            ['test-3']: {
              ...elementMock,
              id: 'test-3',
              parentId: 'test-1',
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...currentPage.elements,
      ['-1']: {
        ...currentPage.elements['-1'],
        children: [childrenMock],
      },
      [elementMock.id]: {
        ...elementMock,
        angle: negateValue(angle),
        children: [
          { ...childrenMock, id: 'test-3' },
          { ...childrenMock, id: 'test-2' },
        ],
        flip: {
          ...flipMock,
          y: true,
        },
      },
      ['test-2']: {
        ...elementMock,
        id: 'test-2',
        parentId: 'test-1',
      },
      ['test-3']: {
        ...elementMock,
        id: 'test-3',
        parentId: 'test-1',
      },
    });
  });
});
