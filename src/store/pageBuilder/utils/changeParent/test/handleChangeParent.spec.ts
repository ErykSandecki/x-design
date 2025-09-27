// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
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
    const payload = {
      draggableElements: ['test-1'],
      possibleIndexPosition: null,
      possibleParent: null,
    };

    // before
    const result = handleChangeParent(payload, {
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
                children: [elementAllDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
              },
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
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
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
                children: [elementAllDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
              },
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
    const payload = {
      draggableElements: ['test-2'],
      possibleIndexPosition: null,
      possibleParent: '-1',
    };

    // before
    const result = handleChangeParent(payload, {
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
                children: ['test-2'],
              },
              ['test-2']: {
                ...elementAllDataMock,
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
                children: [elementAllDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['test-2'],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                id: 'test-2',
                parentId: elementStaticDataMock.id,
              },
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
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [elementAllDataMock.id, 'test-2'],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: [],
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
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
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementAllDataMock.id, 'test-2'],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: [],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                id: 'test-2',
                parentId: '-1',
              },
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
    const payload = {
      draggableElements: ['test-2'],
      possibleIndexPosition: null,
      possibleParent: 'test-1',
    };

    // before
    const result = handleChangeParent(payload, {
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
                children: [elementAllDataMock.id, 'test-2'],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: [],
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
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
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementAllDataMock.id, 'test-2'],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: [],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                id: 'test-2',
                parentId: '-1',
              },
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
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: ['test-2'],
              },
              ['test-2']: {
                ...elementAllDataMock,
                deepLevel: elementAllDataMock.deepLevel + 1,
                id: 'test-2',
                parentId: elementAllDataMock.id,
                position: 'relative',
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                deepLevel: elementDynamicDataMock.deepLevel + 1,
                id: 'test-2',
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
                children: ['test-2'],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                id: 'test-2',
                parentId: elementStaticDataMock.id,
              },
            },
          },
          selectedElements: [
            {
              ...selectedElementMock,
              id: 'test-2',
              parentId: 'test-1',
              position: 'relative',
            },
          ],
        },
      },
    });
  });
});
