// mocks
import { childrenMock, elementMock, layoutMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// types
import { LayoutType } from 'types';

// utils
import { calculateCoordinates } from '../calculateCoordinates';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const stateMock = {
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
        ['test-2']: {
          ...elementMock,
          id: 'test-2',
        },
      },
    },
  },
};

describe('calculateCoordinates', () => {
  beforeEach(() => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    const el3 = document.createElement('div');

    // before
    el1.setAttribute('id', '-1');
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', elementMock.id);
    el2.style.height = '100px';
    el2.style.left = '100px';
    el2.style.top = '100px';
    el2.style.width = '100px';
    el3.setAttribute('id', 'test-2');
    el3.style.height = '100px';
    el3.style.left = '100px';
    el3.style.top = '100px';
    el3.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);
    document.body.appendChild(el3);
  });

  it('should return coordinates when base parent', () => {
    // before
    const result = calculateCoordinates('-1', elementMock.id, '-1', stateMock);

    // result
    expect(result).toStrictEqual({ x: 0, y: 0 });
  });

  it('should return coordinates when free form parent', () => {
    // before
    const result = calculateCoordinates('-1', 'test-2', elementMock.id, stateMock);

    // result
    expect(result).toStrictEqual({ x: 0, y: 0 });
  });

  it('should return coordinates when grid parent', () => {
    // before
    const result = calculateCoordinates('-1', 'test-2', elementMock.id, {
      ...stateMock,
      pages: {
        ...stateMock.pages,
        ['0']: {
          ...stateMock.pages['0'],
          elements: {
            ...stateMock.pages['0'].elements,
            [elementMock.id]: {
              ...stateMock.pages['0'].elements[elementMock.id],
              layout: {
                ...layoutMock,
                type: LayoutType.grid,
              },
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({ x: 0, y: 0 });
  });
});
