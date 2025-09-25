// mocks
import {
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
      draggableElements: ['2'],
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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: ['2'],
              },
              ['2']: {
                ...elementAllDataMock,
                children: [],
                coordinates: { x: 100, y: 100 },
                id: '2',
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
              ['2']: {
                ...elementDynamicDataMock,
                coordinates: { x: 100, y: 100 },
                id: '2',
                position: 'relative',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementAllDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['2'],
              },
              ['2']: {
                ...elementStaticDataMock,
                children: [],
                id: '2',
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
        ['2']: {
          ...elementAllDataMock,
          children: [],
          coordinates: BASE_2D,
          id: '2',
          parentId: elementAllDataMock.id,
          position: 'relative',
        },
      },
      dynamicData: {
        ['2']: {
          ...elementDynamicDataMock,
          coordinates: BASE_2D,
          id: '2',
          position: 'relative',
        },
      },
      staticData: {
        ['2']: {
          ...elementStaticDataMock,
          children: [],
          id: '2',
          parentId: elementStaticDataMock.id,
        },
      },
    });
  });

  it(`should get mapped elements without reset position`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const payload = {
      draggableElements: ['2'],
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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: ['2'],
              },
              ['2']: {
                ...elementAllDataMock,
                children: [],
                coordinates: { x: 100, y: 100 },
                id: '2',
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
              ['2']: {
                ...elementDynamicDataMock,
                coordinates: { x: 100, y: 100 },
                id: '2',
                position: 'absolute',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementAllDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['2'],
              },
              ['2']: {
                ...elementStaticDataMock,
                children: [],
                id: '2',
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
        ['2']: {
          ...elementAllDataMock,
          children: [],
          coordinates: { x: 100, y: 100 },
          id: '2',
          parentId: elementAllDataMock.id,
          position: 'absolute',
        },
      },
      dynamicData: {
        ['2']: {
          ...elementDynamicDataMock,
          coordinates: { x: 100, y: 100 },
          id: '2',
          position: 'absolute',
        },
      },
      staticData: {
        ['2']: {
          ...elementStaticDataMock,
          children: [],
          id: '2',
          parentId: elementStaticDataMock.id,
        },
      },
    });
  });
});
