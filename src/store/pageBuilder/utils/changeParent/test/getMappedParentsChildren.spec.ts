// mocks
import {
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
    const payload = {
      draggableElements: [elementAllDataMock.id],
      possibleIndexPosition: null,
      possibleParent: '-1',
    };

    // before
    const result = getMappedParentsChildren(false, payload, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
            children: [elementAllDataMock.id],
          },
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            children: [],
          },
        },
        dynamicData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
          },
        },
        staticData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
            children: [elementAllDataMock.id],
          },
          [elementStaticDataMock.id]: {
            ...elementStaticDataMock,
            children: [],
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      allData: {
        ['-1']: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
          children: [elementAllDataMock.id],
        },
      },
      dynamicData: {},
      staticData: {
        ['-1']: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
          children: [elementAllDataMock.id],
        },
      },
    });
  });

  it(`should get mapped parents when parent was changed`, () => {
    // mock
    const payload = {
      draggableElements: ['2'],
      possibleIndexPosition: null,
      possibleParent: '-1',
    };

    // before
    const result = getMappedParentsChildren(true, payload, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
            children: [elementAllDataMock.id],
          },
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            children: ['2'],
          },
          ['2']: {
            ...elementAllDataMock,
            children: [],
            id: '2',
            parentId: elementStaticDataMock.id,
          },
        },
        dynamicData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
          },
          ['2']: {
            ...elementDynamicDataMock,
            id: '2',
          },
        },
        staticData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
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
    });

    // result
    expect(result).toStrictEqual({
      allData: {
        ['-1']: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
          children: [elementAllDataMock.id, '2'],
        },
        [elementAllDataMock.id]: {
          ...elementAllDataMock,
          children: [],
        },
      },
      dynamicData: {},
      staticData: {
        ['-1']: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
          children: [elementAllDataMock.id, '2'],
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
    const payload = {
      draggableElements: ['3'],
      possibleIndexPosition: 0,
      possibleParent: elementAllDataMock.id,
    };

    // before
    const result = getMappedParentsChildren(false, payload, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
            children: [elementAllDataMock.id],
          },
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            children: ['2', '3'],
          },
          ['2']: {
            ...elementAllDataMock,
            children: [],
            id: '2',
            parentId: elementStaticDataMock.id,
          },
          ['3']: {
            ...elementAllDataMock,
            children: [],
            id: '3',
            parentId: elementStaticDataMock.id,
          },
        },
        dynamicData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
          },
          ['2']: {
            ...elementDynamicDataMock,
            id: '2',
          },
          ['3']: {
            ...elementDynamicDataMock,
            id: '3',
          },
        },
        staticData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
            children: [elementAllDataMock.id],
          },
          [elementStaticDataMock.id]: {
            ...elementStaticDataMock,
            children: ['2', '3'],
          },
          ['2']: {
            ...elementStaticDataMock,
            children: [],
            id: '2',
            parentId: elementStaticDataMock.id,
          },
          ['3']: {
            ...elementStaticDataMock,
            children: [],
            id: '3',
            parentId: elementStaticDataMock.id,
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      allData: {
        [elementAllDataMock.id]: {
          ...elementAllDataMock,
          children: ['3', '2'],
        },
      },
      dynamicData: {},
      staticData: {
        [elementStaticDataMock.id]: {
          ...elementStaticDataMock,
          children: ['3', '2'],
        },
      },
    });
  });

  it(`should replace index position and parent`, () => {
    // mock
    const payload = {
      draggableElements: ['3'],
      possibleIndexPosition: 0,
      possibleParent: elementAllDataMock.id,
    };

    // before
    const result = getMappedParentsChildren(true, payload, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
            children: [elementAllDataMock.id, '3'],
          },
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            children: ['2'],
          },
          ['2']: {
            ...elementAllDataMock,
            children: [],
            id: '2',
            parentId: elementStaticDataMock.id,
          },
          ['3']: {
            ...elementAllDataMock,
            children: [],
            id: '3',
            parentId: '-1',
          },
        },
        dynamicData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
          },
          ['2']: {
            ...elementDynamicDataMock,
            id: '2',
          },
          ['3']: {
            ...elementDynamicDataMock,
            id: '3',
          },
        },
        staticData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
            children: [elementAllDataMock.id, '3'],
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
          ['3']: {
            ...elementStaticDataMock,
            children: [],
            id: '3',
            parentId: '-1',
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      allData: {
        ['-1']: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
          children: [elementAllDataMock.id],
        },
        [elementAllDataMock.id]: {
          ...elementAllDataMock,
          children: ['3', '2'],
        },
      },
      dynamicData: {},
      staticData: {
        ['-1']: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
          children: [elementAllDataMock.id],
        },
        [elementStaticDataMock.id]: {
          ...elementStaticDataMock,
          children: ['3', '2'],
        },
      },
    });
  });
});
