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
import { getMappedElementsToMove } from '../getMappedElementsToMove';

describe('getMappedElementsToMove', () => {
  beforeEach(() => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    // before
    el1.setAttribute('id', selectedElementMock.id);
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', '2');
    el2.style.height = '100px';
    el2.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);
  });

  it(`should get mapped children when parent was not changed`, () => {
    // mock
    const payload = {
      draggableElements: ['1'],
      possibleIndexPosition: null,
      possibleParent: '-1',
    };

    // before
    const result = getMappedElementsToMove(false, payload, {
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
      ...pageBuilderStateMock[PAGE_BUILDER].elements,
      allData: {
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
        [elementStaticDataMock.id]: {
          ...elementStaticDataMock,
          children: [],
        },
      },
    });
  });

  it(`should get mapped children when parent was changed`, () => {
    // mock
    const payload = {
      draggableElements: ['2'],
      possibleIndexPosition: null,
      possibleParent: '-1',
    };

    // before
    const result = getMappedElementsToMove(true, payload, {
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
            id: '2',
            parentId: elementStaticDataMock.id,
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER].elements,
      allData: {
        ['2']: {
          ...elementAllDataMock,
          children: [],
          id: '2',
        },
      },
      dynamicData: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
        ['2']: {
          ...elementDynamicDataMock,
          id: '2',
        },
      },
      staticData: {
        ['2']: {
          ...elementStaticDataMock,
          children: [],
          id: '2',
        },
      },
    });
  });

  it(`should put element inside another element`, () => {
    // mock
    const payload = {
      draggableElements: ['2'],
      possibleIndexPosition: null,
      possibleParent: elementAllDataMock.id,
    };

    // before
    const result = getMappedElementsToMove(true, payload, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
            children: [elementAllDataMock.id, '2'],
          },
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            children: [],
          },
          ['2']: {
            ...elementAllDataMock,
            id: '2',
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
        },
        staticData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
            children: [elementAllDataMock.id, '2'],
          },
          [elementStaticDataMock.id]: {
            ...elementStaticDataMock,
            children: [],
          },
          ['2']: {
            ...elementStaticDataMock,
            id: '2',
            parentId: '-1',
          },
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER].elements,
      allData: {
        ['2']: {
          ...elementAllDataMock,
          children: [],
          id: '2',
          parentId: elementStaticDataMock.id,
          position: 'relative',
        },
      },
      dynamicData: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
        ['2']: {
          ...elementDynamicDataMock,
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
          position: 'relative',
        },
      },
    });
  });
});
