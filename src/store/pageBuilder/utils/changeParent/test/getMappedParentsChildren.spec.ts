// mocks
import {
  childrenMock,
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// utils
import { getMappedParentsChildren } from '../getMappedParentsChildren';

describe('getMappedParentsChildren', () => {
  it(`should get mapped parents when parent was not changed`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const payload = {
      draggableElements: [childrenMock],
      possibleIndexPosition: null,
      possibleParent: '-1',
    };

    // before
    const result = getMappedParentsChildren(false, payload, {
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
                children: [],
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [childrenMock],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: [],
              },
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      allData: {
        ['-1']: {
          ...currentPage.elements.allData['-1'],
          children: [childrenMock],
        },
      },
      dynamicData: {},
      staticData: {
        ['-1']: {
          ...currentPage.elements.staticData['-1'],
          children: [childrenMock],
        },
      },
    });
  });

  it(`should get mapped parents when parent was changed`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const payload = {
      draggableElements: [{ ...childrenMock, id: 'test-2' }],
      possibleIndexPosition: null,
      possibleParent: '-1',
    };

    // before
    const result = getMappedParentsChildren(true, payload, {
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
                id: 'test-2',
                parentId: elementStaticDataMock.id,
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
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
      allData: {
        ['-1']: {
          ...currentPage.elements.allData['-1'],
          children: [childrenMock, { ...childrenMock, id: 'test-2' }],
        },
        [elementAllDataMock.id]: {
          ...elementAllDataMock,
          children: [],
        },
      },
      dynamicData: {},
      staticData: {
        ['-1']: {
          ...currentPage.elements.staticData['-1'],
          children: [childrenMock, { ...childrenMock, id: 'test-2' }],
        },
        [elementStaticDataMock.id]: {
          ...elementStaticDataMock,
          children: [],
        },
      },
    });
  });

  it(`should replace index position`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const payload = {
      draggableElements: [{ ...childrenMock, id: 'test-3' }],
      possibleIndexPosition: 0,
      possibleParent: elementAllDataMock.id,
    };

    // before
    const result = getMappedParentsChildren(false, payload, {
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
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
              },
              ['test-2']: {
                ...elementAllDataMock,
                children: [],
                id: 'test-2',
                parentId: elementStaticDataMock.id,
              },
              ['test-3']: {
                ...elementAllDataMock,
                children: [],
                id: 'test-3',
                parentId: elementStaticDataMock.id,
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [childrenMock],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                children: [],
                id: 'test-2',
                parentId: elementStaticDataMock.id,
              },
              ['test-3']: {
                ...elementStaticDataMock,
                children: [],
                id: 'test-3',
                parentId: elementStaticDataMock.id,
              },
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      allData: {
        [elementAllDataMock.id]: {
          ...elementAllDataMock,
          children: [
            { ...childrenMock, id: 'test-3' },
            { ...childrenMock, id: 'test-2' },
          ],
        },
      },
      dynamicData: {},
      staticData: {
        [elementStaticDataMock.id]: {
          ...elementStaticDataMock,
          children: [
            { ...childrenMock, id: 'test-3' },
            { ...childrenMock, id: 'test-2' },
          ],
        },
      },
    });
  });

  it(`should replace index position and parent`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const payload = {
      draggableElements: [{ ...childrenMock, id: 'test-3' }],
      possibleIndexPosition: 0,
      possibleParent: elementAllDataMock.id,
    };

    // before
    const result = getMappedParentsChildren(true, payload, {
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
                children: [childrenMock, { ...childrenMock, id: 'test-3' }],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: [{ ...childrenMock, id: 'test-2' }],
              },
              ['test-2']: {
                ...elementAllDataMock,
                children: [],
                id: 'test-2',
                parentId: elementStaticDataMock.id,
              },
              ['test-3']: {
                ...elementAllDataMock,
                children: [],
                id: 'test-3',
                parentId: '-1',
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [childrenMock, { ...childrenMock, id: 'test-3' }],
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
              ['test-3']: {
                ...elementStaticDataMock,
                children: [],
                id: 'test-3',
                parentId: '-1',
              },
            },
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      allData: {
        ['-1']: {
          ...currentPage.elements.allData['-1'],
          children: [childrenMock],
        },
        [elementAllDataMock.id]: {
          ...elementAllDataMock,
          children: [
            { ...childrenMock, id: 'test-3' },
            { ...childrenMock, id: 'test-2' },
          ],
        },
      },
      dynamicData: {},
      staticData: {
        ['-1']: {
          ...currentPage.elements.staticData['-1'],
          children: [childrenMock],
        },
        [elementStaticDataMock.id]: {
          ...elementStaticDataMock,
          children: [
            { ...childrenMock, id: 'test-3' },
            { ...childrenMock, id: 'test-2' },
          ],
        },
      },
    });
  });
});
