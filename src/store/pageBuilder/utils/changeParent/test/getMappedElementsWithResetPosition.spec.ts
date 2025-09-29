// mocks
import { childrenMock, elementMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_2D } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// utils
import { getMappedElementsWithResetPosition } from '../getMappedElementsWithResetPosition';

describe('getMappedElementsWithResetPosition', () => {
  it(`should get mapped elements with reset position`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const payload = {
      draggableElements: [{ ...childrenMock, id: 'test-2' }],
      possibleIndexPosition: null,
      possibleParent: null,
    };

    // before
    const result = getMappedElementsWithResetPosition(payload, {
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
              children: [],
              coordinates: { x: 100, y: 100 },
              id: 'test-2',
              parentId: elementMock.id,
              position: 'relative',
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
        coordinates: BASE_2D,
        id: 'test-2',
        parentId: elementMock.id,
        position: 'relative',
      },
    });
  });

  it(`should get mapped elements without reset position`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const payload = {
      draggableElements: [{ ...childrenMock, id: 'test-2' }],
      possibleIndexPosition: null,
      possibleParent: null,
    };

    // before
    const result = getMappedElementsWithResetPosition(payload, {
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
              children: [],
              coordinates: { x: 100, y: 100 },
              id: 'test-2',
              parentId: elementMock.id,
              position: 'absolute',
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
        coordinates: { x: 100, y: 100 },
        id: 'test-2',
        parentId: elementMock.id,
        position: 'absolute',
      },
    });
  });
});
