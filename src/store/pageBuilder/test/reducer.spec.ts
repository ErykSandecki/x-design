import { cloneDeep } from 'lodash';

// mocks
import {
  elementAllDataMock,
  createFrameMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
  reducerHistoryMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import {
  REDUCER_KEY as PAGE_BUILDER,
  SET_AREA_COORDINATES,
} from '../actionsType';

// store
import pageBuilder from '../reducer';
import {
  addElement,
  selectElement,
  unselectElement,
  selectElements,
  setAreCoordinates,
  setElementsCoordinates,
  updateEventsStatus,
  setElementSizes,
  rotateElements,
  changeParent,
  updatePrevState,
  changeBackground,
  reducerHistoryRedo,
  reducerHistorySave,
  reducerHistoryUndo,
  changePosition,
  changeAlignment,
  clearPrevState,
} from '../actions';

// types
import {
  AlignmentHorizontal,
  AlignmentVertical,
  TAction,
  TBackground,
} from 'types';
import { AnchorResize } from '../enums';
import { TPageBuilderState } from '../types';

describe('PageBuilderReducer', () => {
  const reducer = (action: TAction, initialState = {}): TPageBuilderState =>
    pageBuilder(initialState as TPageBuilderState, action);

  it('should return default state', () => {
    // before
    const state = pageBuilder(
      { ...pageBuilderStateMock[PAGE_BUILDER] },
      { type: '' },
    );

    // result
    expect(state).toEqual(pageBuilderStateMock[PAGE_BUILDER]);
  });

  it('should handle ADD_ELEMENT', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(addElement(createFrameMock), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [createFrameMock.id],
              },
              [createFrameMock.id]: createFrameMock,
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [createFrameMock.id]: {
                alignment: {},
                angle: createFrameMock.angle,
                background: createFrameMock.background,
                coordinates: createFrameMock.coordinates,
                deepLevel: createFrameMock.deepLevel,
                height: createFrameMock.height,
                id: createFrameMock.id,
                layout: createFrameMock.layout,
                position: createFrameMock.position,
                width: createFrameMock.width,
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [createFrameMock.id],
              },
              [createFrameMock.id]: {
                children: createFrameMock.children,
                id: createFrameMock.id,
                parentId: createFrameMock.parentId,
                position: createFrameMock.position,
                type: createFrameMock.type,
              },
            },
          },
        },
      },
    });
  });

  it('should handle CHANGE_ALIGNMENT', () => {
    const alignment = {
      horizontal: AlignmentHorizontal.center,
      vertical: AlignmentVertical.center,
    };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    const el3 = document.createElement('div');
    const parentId = '1';
    const childrenId1 = '2';
    const childrenId2 = '3';

    // before
    el1.setAttribute('id', parentId);
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', childrenId1);
    el2.style.height = '100px';
    el2.style.width = '100px';
    el3.setAttribute('id', childrenId2);
    el3.style.height = '100px';
    el3.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);
    document.body.appendChild(el3);

    // before
    const state = reducer(changeAlignment(alignment), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            allData: {
              ...currentPage.elements.allData,
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: ['2', '3'],
                position: 'absolute',
              },
              ['2']: {
                ...elementAllDataMock,
                children: [],
                id: '2',
                parentId: '1',
                position: 'absolute',
              },
              ['3']: {
                ...elementAllDataMock,
                children: [],
                id: '3',
                parentId: '1',
                position: 'relative',
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              ...currentPage.elements.allData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                position: 'absolute',
              },
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
                position: 'absolute',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
                position: 'relative',
              },
            },
            staticData: {
              ...currentPage.elements.staticData,
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['2', '3'],
                position: 'absolute',
              },
              ['2']: {
                ...elementStaticDataMock,
                children: [],
                id: '2',
                position: 'absolute',
              },
              ['3']: {
                ...elementStaticDataMock,
                children: [],
                id: '3',
                position: 'relative',
              },
            },
          },
          selectedElements: [
            { ...selectedElementMock, id: '2', parentId: '1' },
            { ...selectedElementMock, id: '3', parentId: '1' },
          ],
        },
      },
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            allData: {
              ...currentPage.elements.allData,
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: ['2', '3'],
                position: 'absolute',
              },
              ['2']: {
                ...elementAllDataMock,
                alignment,
                children: [],
                id: '2',
                parentId: '1',
                position: 'absolute',
              },
              ['3']: {
                ...elementAllDataMock,
                alignment,
                children: [],
                id: '3',
                parentId: '1',
                position: 'absolute',
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              ...currentPage.elements.allData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                position: 'absolute',
              },
              ['2']: {
                ...elementDynamicDataMock,
                alignment,
                id: '2',
                position: 'absolute',
              },
              ['3']: {
                ...elementDynamicDataMock,
                alignment,
                id: '3',
                position: 'absolute',
              },
            },
            staticData: {
              ...currentPage.elements.staticData,
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['2', '3'],
                position: 'absolute',
              },
              ['2']: {
                ...elementStaticDataMock,
                children: [],
                id: '2',
                position: 'absolute',
              },
              ['3']: {
                ...elementStaticDataMock,
                children: [],
                id: '3',
                position: 'absolute',
              },
            },
          },
          selectedElements: [
            { ...selectedElementMock, id: '2', parentId: '1' },
            { ...selectedElementMock, id: '3', parentId: '1' },
          ],
        },
      },
    });
  });

  it('should handle CHANGE_POSITION', () => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    const el3 = document.createElement('div');
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    el1.setAttribute('id', selectedElementMock.id);
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', '2');
    el2.style.height = '100px';
    el2.style.width = '100px';
    el3.setAttribute('id', '3');
    el3.style.height = '100px';
    el3.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);
    document.body.appendChild(el3);

    // before
    const state = reducer(changePosition(), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            allData: {
              ...currentPage.elements.allData,
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: ['2', '3'],
                position: 'absolute',
              },
              ['2']: {
                ...elementAllDataMock,
                children: [],
                id: '2',
                parentId: '1',
                position: 'relative',
              },
              ['3']: {
                ...elementAllDataMock,
                children: [],
                id: '3',
                parentId: '1',
                position: 'relative',
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              ...currentPage.elements.allData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                position: 'absolute',
              },
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
                position: 'relative',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
                position: 'relative',
              },
            },
            staticData: {
              ...currentPage.elements.staticData,
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['2', '3'],
                position: 'absolute',
              },
              ['2']: {
                ...elementStaticDataMock,
                children: [],
                id: '2',
                position: 'relative',
              },
              ['3']: {
                ...elementStaticDataMock,
                children: [],
                id: '3',
                position: 'relative',
              },
            },
          },
          selectedElements: [
            { ...selectedElementMock, id: '2', parentId: '1' },
          ],
        },
      },
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            allData: {
              ...currentPage.elements.allData,
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: ['3', '2'],
                position: 'absolute',
              },
              ['2']: {
                ...elementAllDataMock,
                alignment: {},
                children: [],
                id: '2',
                parentId: '1',
                position: 'absolute',
              },
              ['3']: {
                ...elementAllDataMock,
                children: [],
                id: '3',
                parentId: '1',
                position: 'relative',
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              ...currentPage.elements.allData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                position: 'absolute',
              },
              ['2']: {
                ...elementDynamicDataMock,
                alignment: {},
                id: '2',
                position: 'absolute',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
                position: 'relative',
              },
            },
            staticData: {
              ...currentPage.elements.staticData,
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['3', '2'],
                position: 'absolute',
              },
              ['2']: {
                ...elementStaticDataMock,
                children: [],
                id: '2',
                position: 'absolute',
              },
              ['3']: {
                ...elementStaticDataMock,
                children: [],
                id: '3',
                position: 'relative',
              },
            },
          },
          selectedElements: [
            { ...selectedElementMock, id: '2', parentId: '1' },
          ],
        },
      },
    });
  });

  it('should handle CHANGE_BACKGROUND', () => {
    // mock
    const background: TBackground = {
      properties: {
        alpha: '100',
        color: '#ffffff',
        format: 'hex',
      },
      visible: true,
    };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(changeBackground(background, '-1'), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            allData: {
              ...currentPage.elements.allData,
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                background: {
                  ...currentPage.elements.allData['-1'].background,
                  ...background,
                },
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
                background: {
                  ...currentPage.elements.dynamicData['-1'].background,
                  ...background,
                },
              },
            },
            staticData: {
              ...currentPage.elements.staticData,
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
              },
            },
          },
        },
      },
    });
  });

  it('should handle CHANGE_PARENT', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const draggableElements = ['2'];
    const possibleIndexPosition = null;
    const possibleParent = '-1';
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

    // before
    const state = reducer(
      changeParent(draggableElements, possibleIndexPosition, possibleParent),
      {
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
                  children: [selectedElementMock.id],
                },
                [elementAllDataMock.id]: {
                  ...elementAllDataMock,
                  children: ['2'],
                },
                ['2']: {
                  ...elementAllDataMock,
                  id: '2',
                  parentId: selectedElementMock.id,
                },
              },
              dynamicData: {
                ...currentPage.elements.dynamicData,
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
                  ...currentPage.elements.staticData['-1'],
                  children: [selectedElementMock.id],
                },

                [elementStaticDataMock.id]: {
                  ...elementStaticDataMock,
                  children: ['2'],
                },
                ['2']: {
                  ...elementStaticDataMock,
                  id: '2',
                  parentId: selectedElementMock.id,
                },
              },
            },
          },
        },
      },
    );

    // result
    expect(state).toStrictEqual({
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
                children: [selectedElementMock.id, '2'],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
              },
              ['2']: {
                ...elementAllDataMock,
                id: '2',
                parentId: '-1',
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
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
                ...currentPage.elements.staticData['-1'],
                children: [selectedElementMock.id, '2'],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
              },
              ['2']: {
                ...elementStaticDataMock,
                id: '2',
                parentId: '-1',
              },
            },
          },
        },
      },
    });
  });

  it('should handle CLEAR_PREV_STATE', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(clearPrevState(), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          prevState: currentPage,
        },
      },
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          prevState: undefined,
        },
      },
    });
  });

  it('should handle REDUCER_HISTORY_REDO', () => {
    // mock
    const currentPage =
      pageBuilderStateMock[PAGE_BUILDER].pages[
        pageBuilderStateMock[PAGE_BUILDER].currentPage
      ];

    // before
    const state = reducer(reducerHistoryRedo(), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,

          reducerHistory: reducerHistoryMock,
          reducerHistoryIndex: 1,
        },
      },
    });

    // result
    expect(state).toEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          ...reducerHistoryMock[0],
          reducerHistory: reducerHistoryMock,
          reducerHistoryIndex: 0,
        },
      },
    });
  });

  it('should handle REDUCER_HISTORY_SAVE', () => {
    // mock
    const currentPage =
      pageBuilderStateMock[PAGE_BUILDER].pages[
        pageBuilderStateMock[PAGE_BUILDER].currentPage
      ];

    // before
    const state = reducer(reducerHistorySave(SET_AREA_COORDINATES), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: reducerHistoryMock,
          reducerHistoryIndex: 1,
        },
      },
    });

    // result
    expect(state).toEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: [reducerHistoryMock[0], reducerHistoryMock[1]],
          reducerHistoryIndex: 1,
        },
      },
    });
  });

  it('should handle REDUCER_HISTORY_UNDO', () => {
    // mock
    const currentPage =
      pageBuilderStateMock[PAGE_BUILDER].pages[
        pageBuilderStateMock[PAGE_BUILDER].currentPage
      ];

    // before
    const state = reducer(reducerHistoryUndo(), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          reducerHistory: reducerHistoryMock,
          reducerHistoryIndex: 0,
        },
      },
    });

    // result
    expect(state).toEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          ...reducerHistoryMock[1],
          reducerHistory: reducerHistoryMock,
          reducerHistoryIndex: 1,
        },
      },
    });
  });

  it('should handle ROTATE_ELEMENT', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const angle = 180;

    // before
    const state = reducer(rotateElements(angle), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            allData: {
              ...currentPage.elements.allData,
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
              ...currentPage.elements.staticData,
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
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            allData: {
              ...currentPage.elements.allData,
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle,
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                angle,
              },
            },
            staticData: {
              ...currentPage.elements.staticData,
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

  it('should handle SELECT_ELEMENT', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(selectElement(selectedElementMock), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle SELECT_ELEMENTS', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(selectElements([selectedElementMock]), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle SET_AREA_COORDINATES', () => {
    // mock
    const areaCoordinates = { x: 100, y: 100, z: 2 };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(setAreCoordinates(areaCoordinates), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          areaCoordinates,
        },
      },
    });
  });

  it('should handle SET_ELEMENT_SIZES', () => {
    // mock
    const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const mouseCoordinates = { x: 200, y: 100 };

    // before
    const state = reducer(
      setElementSizes(
        baseCoordinates,
        100,
        selectedElementMock.id,
        mouseCoordinates,
        100,
      ),
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...pageBuilderStateMock[PAGE_BUILDER].events,
          selectedAnchorResize: AnchorResize.east,
        },
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                [elementAllDataMock.id]: elementAllDataMock,
              },
              dynamicData: {
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: {
                [elementStaticDataMock.id]: elementStaticDataMock,
              },
            },
            selectedElements: {
              [selectedElementMock.id]: selectedElementMock,
            },
          },
        },
      },
    );

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...pageBuilderStateMock[PAGE_BUILDER].events,
        selectedAnchorResize: AnchorResize.east,
      },
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                coordinates: { x: 0, y: 0 },
                height: 100,
                width: 300,
              },
            },
            dynamicData: {
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                coordinates: { x: 0, y: 0 },
                height: 100,
                width: 300,
              },
            },
            staticData: {
              [elementStaticDataMock.id]: elementStaticDataMock,
            },
          },
          selectedElements: {
            [selectedElementMock.id]: selectedElementMock,
          },
        },
      },
    });
  });

  it('should handle SET_ELEMENTS_COORDINATES', () => {
    // mock
    const coordinates = { x: 100, y: 100 };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const mockState = {
      ...currentPage,
      elements: {
        allData: { [elementAllDataMock.id]: elementAllDataMock },
        dynamicData: { [elementDynamicDataMock.id]: elementDynamicDataMock },
        staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
      },
      selectedElements: [selectedElementMock],
    };
    const prevState = cloneDeep(mockState);

    // before
    const state = reducer(setElementsCoordinates(coordinates, 'dynamic'), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: { [elementAllDataMock.id]: elementAllDataMock },
            dynamicData: {
              [elementDynamicDataMock.id]: elementDynamicDataMock,
            },
            staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
          },
          prevState,
          selectedElements: [selectedElementMock],
        },
      },
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                alignment: {},
                coordinates,
              },
            },
            dynamicData: {
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                alignment: {},
                coordinates,
              },
            },
            staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
          },
          prevState,
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle UPDATE_EVENTS_STATUS', () => {
    // before
    const state = reducer(updateEventsStatus({ isMultipleMoving: true }), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...pageBuilderStateMock[PAGE_BUILDER].events,
        isMultipleMoving: true,
      },
    });
  });

  it('should handle UPDATE_PREV_STATE', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(updatePrevState(), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          prevState: currentPage,
        },
      },
    });
  });

  it('should handle UNSELECT_ELEMENT', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const id = selectedElementMock.id;

    // before
    const state = reducer(unselectElement(id), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          selectedElements: [selectedElementMock],
        },
      },
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
    });
  });
});
