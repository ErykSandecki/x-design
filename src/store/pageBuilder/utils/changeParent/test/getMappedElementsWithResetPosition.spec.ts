// mocks
import {
  childrenMock,
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

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
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: [{ ...childrenMock, id: 'test-2' }],
              },
              ['test-2']: {
                ...elementAllDataMock,
                children: [],
                coordinates: { x: 100, y: 100 },
                id: 'test-2',
                parentId: elementAllDataMock.id,
                position: 'relative',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                coordinates: { x: 100, y: 100 },
                id: 'test-2',
                position: 'relative',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [childrenMock],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: [{ ...childrenMock, id: 'test-2' }],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                children: [],
                id: 'test-2',
                parentId: elementStaticDataMock.id,
              },
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...currentPage.elements,
      allData: {
        ['test-2']: {
          ...elementAllDataMock,
          children: [],
          coordinates: BASE_2D,
          id: 'test-2',
          parentId: elementAllDataMock.id,
          position: 'relative',
        },
      },
      dynamicData: {
        ['test-2']: {
          ...elementDynamicDataMock,
          coordinates: BASE_2D,
          id: 'test-2',
          position: 'relative',
        },
      },
      staticData: {
        ['test-2']: {
          ...elementStaticDataMock,
          children: [],
          id: 'test-2',
          parentId: elementStaticDataMock.id,
        },
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
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: [{ ...childrenMock, id: 'test-2' }],
              },
              ['test-2']: {
                ...elementAllDataMock,
                children: [],
                coordinates: { x: 100, y: 100 },
                id: 'test-2',
                parentId: elementAllDataMock.id,
                position: 'absolute',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                coordinates: { x: 100, y: 100 },
                id: 'test-2',
                position: 'absolute',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [childrenMock],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: [{ ...childrenMock, id: 'test-2' }],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                children: [],
                id: 'test-2',
                parentId: elementStaticDataMock.id,
              },
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...currentPage.elements,
      allData: {
        ['test-2']: {
          ...elementAllDataMock,
          children: [],
          coordinates: { x: 100, y: 100 },
          id: 'test-2',
          parentId: elementAllDataMock.id,
          position: 'absolute',
        },
      },
      dynamicData: {
        ['test-2']: {
          ...elementDynamicDataMock,
          coordinates: { x: 100, y: 100 },
          id: 'test-2',
          position: 'absolute',
        },
      },
      staticData: {
        ['test-2']: {
          ...elementStaticDataMock,
          children: [],
          id: 'test-2',
          parentId: elementStaticDataMock.id,
        },
      },
    });
  });
});
