// others
import {
  ADD_ELEMENT,
  CHANGE_ALIGNMENT,
  CHANGE_BACKGROUND,
  CHANGE_PARENT,
  CHANGE_POSITION,
  CLEAR_PREV_STATE,
  REDUCER_HISTORY_REDO,
  REDUCER_HISTORY_SAVE,
  REDUCER_HISTORY_UNDO,
  ROTATE_ELEMENT,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
  SET_ELEMENT_SIZES,
  SET_ELEMENTS_COORDINATES,
  UNSELECT_ELEMENT,
  UPDATE_EVENTS_STATUS,
  UPDATE_PREV_STATE,
} from './actionsType';
import { BASE_PAGE } from './constants';

// types
import { AnchorResize, AnchorRotate } from './enums';
import { KeyboardKeys, TAction } from 'types';
import {
  TAddELementAction,
  TSelectElementAction,
  TPageBuilderState,
  TUnselectElementAction,
  TSelectElementsAction,
  TSetAreaCoordinatesAction,
  TSetElementsCoordinatesAction,
  TUpdateEventsStatusAction,
  TSetElementSizesAction,
  TRotateElementAction,
  TChangeParentAction,
  TChangeBackgroundAction,
  TReducerHistorySaveAction,
  TChangeAlignmentAction,
} from './types';

// utils
import { filterSelectedElements } from './utils/filterSelectedElements';
import { handleAddElement } from './utils/handleAddElement';
import { handleChangeAlignment } from './utils/handleChangeAlignment';
import { handleChangeBackground } from './utils/handleChangeBackground';
import { handleChangeParent } from './utils/changeParent/handleChangeParent';
import { handleChangePosition } from './utils/handleChangePosition';
import { handleReducerHistoryRedo } from './utils/reducerHistory/handleReducerHistoryRedo';
import { handleReducerHistorySave } from './utils/reducerHistory/handleReducerHistorySave';
import { handleReducerHistoryUndo } from './utils/reducerHistory/handleReducerHistoryUndo';
import { handleRotateElement } from './utils/handleRotateElement';
import { handleSetElementsCoordinates } from './utils/handleSetElementsCoordinates';
import { handleSetElementSizes } from './utils/handleSetElementSize';

const initialState: TPageBuilderState = {
  currentPage: '0',
  events: {
    canMoveElements: true,
    colorSampler: false,
    draggableElements: [],
    hoverOnElement: '-1',
    isMultipleMoving: false,
    isResizing: false,
    isRotating: false,
    possibleIndexPosition: null,
    possibleParent: null,
    pressedKey: KeyboardKeys.none,
    selectedAnchorResize: AnchorResize.none,
    selectedAnchorRotate: AnchorRotate.none,
  },
  isLoading: true,
  isPending: false,
  // @ts-ignore
  pages: {
    [BASE_PAGE.id]: {
      ...BASE_PAGE,
      elements: {
        allData: {
          '1': {
            alignment: {},
            background: {
              properties: {
                alpha: '100',
                color: '#180000ff',
                format: 'hex',
              },
              visible: true,
            },
            children: ['2'],
            coordinates: {
              x: 696,
              y: 363,
            },
            deepLevel: 0,
            height: 239,
            id: '1',
            parentId: '-1',
            position: 'absolute',
            rotate: -30,
            type: 'frame',
            width: 478,
          },
          '2': {
            alignment: {},
            background: {
              properties: {
                alpha: '100',
                color: '#1bff9cff',
                format: 'hex',
              },
              visible: true,
            },
            children: ['mfo87nr91758128327684'],
            coordinates: {
              x: 0,
              y: 0,
            },
            deepLevel: 1,
            height: 124,
            id: '2',
            parentId: '1',
            position: 'relative',
            rotate: -38.979430805141874,
            type: 'frame',
            width: 404,
          },
          '-1': {
            alignment: {},
            background: {
              properties: {
                alpha: '100',
                color: '#1e262f',
                format: 'hex',
              },
              visible: true,
            },
            children: ['1'],
            coordinates: {
              x: 0,
              y: 0,
            },
            deepLevel: 0,
            height: 0,
            id: '-1',
            parentId: '-1',
            position: 'absolute',
            rotate: 0,
            type: 'base',
            width: 0,
          },
          mfo87nr91758128327684: {
            alignment: {},
            background: {
              properties: {
                alpha: '100',
                color: '#ffffff',
                format: 'hex',
              },
              visible: true,
            },
            children: [],
            coordinates: {
              x: 0,
              y: 0,
            },
            deepLevel: 2,
            height: 76,
            id: 'mfo87nr91758128327684',
            parentId: '2',
            position: 'absolute',
            rotate: 0,
            type: 'frame',
            width: 89,
          },
        },
        dynamicData: {
          '1': {
            alignment: {},
            background: {
              properties: {
                alpha: '100',
                color: '#180000ff',
                format: 'hex',
              },
              visible: true,
            },
            coordinates: {
              x: 696,
              y: 363,
            },
            deepLevel: 0,
            height: 239,
            id: '1',
            position: 'absolute',
            rotate: -30,
            width: 478,
          },
          '2': {
            alignment: {},
            background: {
              properties: {
                alpha: '100',
                color: '#1bff9cff',
                format: 'hex',
              },
              visible: true,
            },
            coordinates: {
              x: 0,
              y: 0,
            },
            deepLevel: 1,
            height: 124,
            id: '2',
            position: 'relative',
            rotate: -38.979430805141874,
            width: 404,
          },
          '-1': {
            alignment: {},
            background: {
              properties: {
                alpha: '100',
                color: '#1e262f',
                format: 'hex',
              },
              visible: true,
            },
            coordinates: {
              x: 0,
              y: 0,
            },
            deepLevel: 0,
            height: 0,
            id: '-1',
            position: 'absolute',
            rotate: 0,
            width: 0,
          },
          mfo87nr91758128327684: {
            alignment: {},
            background: {
              properties: {
                alpha: '100',
                color: '#ffffff',
                format: 'hex',
              },
              visible: true,
            },
            coordinates: {
              x: 0,
              y: 0,
            },
            deepLevel: 2,
            height: 76,
            id: 'mfo87nr91758128327684',
            position: 'absolute',
            rotate: 0,
            width: 89,
          },
        },
        staticData: {
          '1': {
            children: ['2'],
            id: '1',
            parentId: '-1',
            position: 'absolute',
            type: 'frame',
          },
          '2': {
            children: ['mfo87nr91758128327684'],
            id: '2',
            parentId: '1',
            position: 'relative',
            type: 'frame',
          },
          '-1': {
            children: ['1'],
            id: '-1',
            parentId: '-1',
            position: 'absolute',
            type: 'base',
          },
          mfo87nr91758128327684: {
            children: [],
            id: 'mfo87nr91758128327684',
            parentId: '2',
            position: 'absolute',
            type: 'frame',
          },
        },
      },
    },
  },
};

const addElement = (
  state: TPageBuilderState,
  { payload: element }: TAction<TAddELementAction['payload']>,
): TPageBuilderState => handleAddElement(element, state);

const changeAlignment = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeAlignmentAction['payload']>,
): TPageBuilderState => handleChangeAlignment(payload, state);

const changeBackground = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeBackgroundAction['payload']>,
): TPageBuilderState => handleChangeBackground(payload, state);

const changeParent = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeParentAction['payload']>,
): TPageBuilderState => handleChangeParent(payload, state);

const changePosition = (state: TPageBuilderState): TPageBuilderState =>
  handleChangePosition(state);

const clearPrevState = (state: TPageBuilderState): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      prevState: undefined,
    },
  },
});

const reducerHistoryRedo = (state: TPageBuilderState): TPageBuilderState =>
  handleReducerHistoryRedo(state);

const reducerHistorySave = (
  state: TPageBuilderState,
  { payload }: TAction<TReducerHistorySaveAction['payload']>,
): TPageBuilderState => handleReducerHistorySave(state, payload);

const reducerHistoryUndo = (state: TPageBuilderState): TPageBuilderState =>
  handleReducerHistoryUndo(state);

const rotateElement = (
  state: TPageBuilderState,
  { payload }: TAction<TRotateElementAction['payload']>,
): TPageBuilderState => handleRotateElement(payload, state);

const selectElement = (
  state: TPageBuilderState,
  { payload: selectedElement }: TAction<TSelectElementAction['payload']>,
): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      selectedElements: filterSelectedElements(
        [...state.pages[state.currentPage].selectedElements, selectedElement],
        state,
      ),
    },
  },
});

const selectElements = (
  state: TPageBuilderState,
  { payload: selectedElements }: TAction<TSelectElementsAction['payload']>,
): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      selectedElements: filterSelectedElements(selectedElements, state),
    },
  },
});

const setAreaCoordinates = (
  state: TPageBuilderState,
  { payload: areaCoordinates }: TAction<TSetAreaCoordinatesAction['payload']>,
): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      areaCoordinates: {
        ...state.pages[state.currentPage].areaCoordinates,
        ...areaCoordinates,
      },
    },
  },
});

const setElementSizes = (
  state: TPageBuilderState,
  {
    payload: { baseCoordinates, height, id, mouseCoordinates, width },
  }: TAction<TSetElementSizesAction['payload']>,
): TPageBuilderState =>
  handleSetElementSizes(
    baseCoordinates,
    height,
    width,
    id,
    mouseCoordinates,
    state,
  );

const setElementsCoordinates = (
  state: TPageBuilderState,
  { payload: coordinates }: TAction<TSetElementsCoordinatesAction['payload']>,
): TPageBuilderState => handleSetElementsCoordinates(coordinates, state);

const updateEventsStatus = (
  state: TPageBuilderState,
  { payload: events }: TAction<TUpdateEventsStatusAction['payload']>,
): TPageBuilderState => ({
  ...state,
  events: {
    ...state.events,
    ...events,
  },
});

const updatePrevState = (state: TPageBuilderState): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      prevState: state.pages[state.currentPage],
    },
  },
});

const unselectElement = (
  state: TPageBuilderState,
  { payload: id }: TAction<TUnselectElementAction['payload']>,
): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      selectedElements: state.pages[state.currentPage].selectedElements.filter(
        (element) => element.id !== id,
      ),
    },
  },
});

const pageBuilder = (
  state: TPageBuilderState = initialState,
  action: TAction,
): TPageBuilderState => {
  switch (action.type) {
    case ADD_ELEMENT:
      return addElement(state, action);
    case CHANGE_ALIGNMENT:
      return changeAlignment(state, action);
    case CHANGE_BACKGROUND:
      return changeBackground(state, action);
    case CHANGE_PARENT:
      return changeParent(state, action);
    case CHANGE_POSITION:
      return changePosition(state);
    case CLEAR_PREV_STATE:
      return clearPrevState(state);
    case REDUCER_HISTORY_REDO:
      return reducerHistoryRedo(state);
    case REDUCER_HISTORY_SAVE:
      return reducerHistorySave(state, action);
    case REDUCER_HISTORY_UNDO:
      return reducerHistoryUndo(state);
    case ROTATE_ELEMENT:
      return rotateElement(state, action);
    case SELECT_ELEMENT:
      return selectElement(state, action);
    case SELECT_ELEMENTS:
      return selectElements(state, action);
    case SET_AREA_COORDINATES:
      return setAreaCoordinates(state, action);
    case SET_ELEMENT_SIZES:
      return setElementSizes(state, action);
    case SET_ELEMENTS_COORDINATES:
      return setElementsCoordinates(state, action);
    case UPDATE_EVENTS_STATUS:
      return updateEventsStatus(state, action);
    case UPDATE_PREV_STATE:
      return updatePrevState(state);
    case UNSELECT_ELEMENT:
      return unselectElement(state, action);
    default:
      return state;
  }
};

export default pageBuilder;
