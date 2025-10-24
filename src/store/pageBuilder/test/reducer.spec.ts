import { cloneDeep } from 'lodash';

// mocks
import {
  elementMock,
  createFrameMock,
  pageBuilderStateMock,
  selectedElementMock,
  reducerHistoryMock,
  layoutMock,
  childrenMock,
  flipMock,
  eventsMock,
  gapMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER, SET_AREA_COORDINATES } from '../actionsType';
import { ZOOM_CONTENT_ID } from 'shared';

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
  resizeElement,
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
  flipElements,
  changeLayout,
  fitLayout,
  setElementsSizes,
  applyElementsSizeType,
  setElementsSizesMinMax,
  setElementsScoreToCurrentSize,
  toggleAspectRatio,
  changeLayoutAlignment,
  setElementsGap,
  applyElementsGapType,
  changeLayoutBoxSizing,
} from '../actions';

// types
import { AlignmentLayout, AlignmentHorizontal, AlignmentVertical, LayoutType, TAction, TBackground, Unit } from 'types';
import { AnchorResize } from '../enums';
import { TPageBuilderState } from '../types';

// utils
import { createHtmlElement, negateValue } from 'utils';

const zoomContent = createHtmlElement('div', { id: ZOOM_CONTENT_ID });

describe('PageBuilderReducer', () => {
  const reducer = (action: TAction, initialState = {}): TPageBuilderState =>
    pageBuilder(initialState as TPageBuilderState, action);

  beforeAll(() => {
    // mock
    document.body.appendChild(zoomContent);
  });

  it('should return default state', () => {
    // before
    const state = pageBuilder({ ...pageBuilderStateMock[PAGE_BUILDER] }, { type: '' });

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
            ...currentPage.elements,
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [childrenMock],
            },
            [createFrameMock.id]: createFrameMock,
          },
        },
      },
    });
  });

  it('should handle APPLY_ELEMENTS_GAP_TYPE', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(applyElementsGapType('column', 'fixed'), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: elementMock,
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
            [elementMock.id]: elementMock,
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle APPLY_ELEMENTS_SIZE_TYPE', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;

    // before
    const state = reducer(applyElementsSizeType('height', 'unit'), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: elementMock,
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
            [elementMock.id]: {
              ...elementMock,
              height: { unit: Unit.percentage, value: 100 },
            },
          },
          selectedElements: [selectedElementMock],
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
    const parentId = 'test-1';
    const childrenId1 = 'test-2';
    const childrenId2 = 'test-3';

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
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [childrenMock],
            },
            [elementMock.id]: {
              ...elementMock,
              children: [
                { ...childrenMock, id: 'test-2' },
                { ...childrenMock, id: 'test-3' },
              ],
              position: 'absolute',
            },
            ['test-2']: {
              ...elementMock,
              children: [],
              id: 'test-2',
              parentId: 'test-1',
              position: 'absolute',
            },
            ['test-3']: {
              ...elementMock,
              children: [],
              id: 'test-3',
              parentId: 'test-1',
              position: 'relative',
            },
          },
          selectedElements: [
            { ...selectedElementMock, id: 'test-2', parentId: 'test-1' },
            { ...selectedElementMock, id: 'test-3', parentId: 'test-1' },
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
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [childrenMock],
            },
            [elementMock.id]: {
              ...elementMock,
              children: [
                { ...childrenMock, id: 'test-2' },
                { ...childrenMock, id: 'test-3' },
              ],
              position: 'absolute',
            },
            ['test-2']: {
              ...elementMock,
              alignment,
              children: [],
              id: 'test-2',
              parentId: 'test-1',
              position: 'absolute',
            },
            ['test-3']: {
              ...elementMock,
              alignment,
              children: [],
              id: 'test-3',
              parentId: 'test-1',
              position: 'absolute',
            },
          },
          selectedElements: [
            { ...selectedElementMock, id: 'test-2', parentId: 'test-1' },
            { ...selectedElementMock, id: 'test-3', parentId: 'test-1' },
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
    el2.setAttribute('id', 'test-2');
    el2.style.height = '100px';
    el2.style.width = '100px';
    el3.setAttribute('id', 'test-3');
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
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [childrenMock],
            },
            [elementMock.id]: {
              ...elementMock,
              children: [
                { ...childrenMock, id: 'test-2' },
                { ...childrenMock, id: 'test-3' },
              ],
              position: 'absolute',
            },
            ['test-2']: {
              ...elementMock,
              children: [],
              id: 'test-2',
              parentId: 'test-1',
              position: 'relative',
            },
            ['test-3']: {
              ...elementMock,
              children: [],
              id: 'test-3',
              parentId: 'test-1',
              position: 'relative',
            },
          },
          selectedElements: [{ ...selectedElementMock, id: 'test-2', parentId: 'test-1' }],
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
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [childrenMock],
            },
            [elementMock.id]: {
              ...elementMock,
              children: [
                { ...childrenMock, id: 'test-3' },
                { ...childrenMock, id: 'test-2' },
              ],
              position: 'absolute',
            },
            ['test-2']: {
              ...elementMock,
              alignment: {},
              children: [],
              id: 'test-2',
              parentId: 'test-1',
              position: 'absolute',
            },
            ['test-3']: {
              ...elementMock,
              children: [],
              id: 'test-3',
              parentId: 'test-1',
              position: 'relative',
            },
          },
          selectedElements: [{ ...selectedElementMock, id: 'test-2', parentId: 'test-1' }],
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
            ['-1']: {
              ...currentPage.elements['-1'],
              background: {
                ...currentPage.elements['-1'].background,
                ...background,
              },
            },
          },
        },
      },
    });
  });

  it('should handle CHANGE_LAYOUT', () => {
    // mock
    const layoutType = LayoutType.vertical;
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(changeLayout(layoutType), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [selectedElementMock.id, 'test-2'],
            },
            [elementMock.id]: {
              ...elementMock,
              layout: {
                ...layoutMock,
                type: LayoutType.freeForm,
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
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [selectedElementMock.id, 'test-2'],
            },
            [elementMock.id]: {
              ...elementMock,
              layout: {
                ...layoutMock,
                alignment: AlignmentLayout.topLeft,
                type: layoutType,
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle CHANGE_LAYOUT_ALIGNMENT', () => {
    // mock
    const alignment = AlignmentLayout.center;
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(changeLayoutAlignment(alignment), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [selectedElementMock.id, 'test-2'],
            },
            [elementMock.id]: {
              ...elementMock,
              layout: {
                ...layoutMock,
                alignment: AlignmentLayout.topLeft,
                type: LayoutType.horizontal,
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
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [selectedElementMock.id, 'test-2'],
            },
            [elementMock.id]: {
              ...elementMock,
              layout: {
                ...layoutMock,
                alignment: AlignmentLayout.center,
                type: LayoutType.horizontal,
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle CHANGE_LAYOUT_BOX_SIZING', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(changeLayoutBoxSizing('included'), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [selectedElementMock.id, 'test-2'],
            },
            [elementMock.id]: elementMock,
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
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [selectedElementMock.id, 'test-2'],
            },
            [elementMock.id]: {
              ...elementMock,
              layout: {
                ...layoutMock,
                boxSizing: 'included',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle CHANGE_PARENT', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const draggableElements = [{ ...childrenMock, id: 'test-2' }];
    const possibleIndexPosition = null;
    const possibleParent = '-1';
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

    // before
    const state = reducer(changeParent(), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...eventsMock,
        draggableElements,
        possibleIndexPosition,
        possibleParent,
      },
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
              id: 'test-2',
              parentId: selectedElementMock.id,
            },
          },
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
            ['-1']: {
              ...currentPage.elements['-1'],
              children: [childrenMock, { ...childrenMock, id: 'test-2' }],
            },
            [elementMock.id]: {
              ...elementMock,
            },
            ['test-2']: {
              ...elementMock,
              id: 'test-2',
              parentId: '-1',
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

  it('should handle FLIP_ELEMENTS', () => {
    // mock
    const angle = 45;
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(flipElements('y'), {
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
                ...layoutMock,
                type: LayoutType.vertical,
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
    expect(state).toStrictEqual({
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
              angle: negateValue(angle),
              children: [
                { ...childrenMock, id: 'test-3' },
                { ...childrenMock, id: 'test-2' },
              ],
              flip: {
                ...flipMock,
                y: true,
              },
              layout: {
                ...layoutMock,
                type: LayoutType.vertical,
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
  });

  it('should handle FIT_LAYOUT', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(fitLayout(), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: elementMock,
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
            [elementMock.id]: {
              ...elementMock,
              height: { value: 'auto' },
              width: { value: 'auto' },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle REDUCER_HISTORY_REDO', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];

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
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];

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
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];

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

  it('should handle RESIZE_ELEMENT', () => {
    // mock
    const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const mouseCoordinates = { x: 200, y: 100 };

    // before
    const state = reducer(
      resizeElement(baseCoordinates, flipMock, 100, selectedElementMock.id, mouseCoordinates, 100),
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
              ...currentPage.elements,
              [elementMock.id]: elementMock,
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
            ...currentPage.elements,
            [elementMock.id]: {
              ...elementMock,
              coordinates: { x: 0, y: 0 },
              height: { value: 100 },
              width: { value: 300 },
            },
          },
          selectedElements: {
            [selectedElementMock.id]: selectedElementMock,
          },
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
            [elementMock.id]: {
              ...elementMock,
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
            [elementMock.id]: {
              ...elementMock,
              angle,
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

  it('should handle SET_ELEMENTS_COORDINATES', () => {
    // mock
    const coordinates = { x: 100, y: 100 };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const mockState = {
      ...currentPage,
      elements: {
        [elementMock.id]: elementMock,
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
            ...currentPage.elements,
            [elementMock.id]: elementMock,
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
            ...currentPage.elements,
            [elementMock.id]: {
              ...elementMock,
              alignment: {},
              coordinates,
            },
          },
          prevState,
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle SET_ELEMENTS_GAP', () => {
    // mock
    const gap = 'column';
    const value = 100;
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const mockState = {
      ...currentPage,
      elements: {
        [elementMock.id]: elementMock,
      },
      selectedElements: [selectedElementMock],
    };
    const prevState = cloneDeep(mockState);

    // before
    const state = reducer(setElementsGap(gap, value), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: {
              ...elementMock,
              layout: {
                ...layoutMock,
                alignment: AlignmentLayout.topLeft,
                type: LayoutType.vertical,
              },
            },
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
            ...currentPage.elements,
            [elementMock.id]: {
              ...elementMock,
              layout: {
                ...layoutMock,
                alignment: AlignmentLayout.topLeft,
                gap: { ...layoutMock.gap, [gap]: { ...gapMock, value } },
                type: LayoutType.vertical,
              },
            },
          },
          prevState,
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle SET_ELEMENTS_SCORE_TO_CURRENT_SIZE', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(setElementsScoreToCurrentSize('min', 'height'), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: elementMock,
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
            [elementMock.id]: {
              ...elementMock,
              height: { ...elementMock.height, min: 100 },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle SET_ELEMENT_SIZES', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(setElementsSizes('height', 'auto'), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: elementMock,
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
            [elementMock.id]: {
              ...elementMock,
              height: { value: 'auto' },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle SET_ELEMENT_SIZES_MIN_MAX', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(setElementsSizesMinMax('min', 'height', 100), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: elementMock,
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
            [elementMock.id]: {
              ...elementMock,
              height: { ...elementMock.height, min: 100 },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it('should handle TOGGLE_ASPECT_RATIO', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const state = reducer(toggleAspectRatio(), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: elementMock,
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
            [elementMock.id]: {
              ...elementMock,
              aspectRatio: true,
            },
          },
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
