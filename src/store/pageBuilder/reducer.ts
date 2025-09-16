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
  SET_ELEMENT_COORDINATES,
  SET_ELEMENT_SIZES,
  SET_ELEMENTS_COORDINATES,
  UNSELECT_ELEMENT,
  UPDATE_EVENTS_STATUS,
  UPDATE_PREV_STATE,
} from './actionsType';
import { BASE_PAGE } from './constants';

// types
import { AnchorResize } from './enums';
import { KeyboardKeys, TAction } from 'types';
import {
  TAddELementAction,
  TSelectElementAction,
  TPageBuilderState,
  TUnselectElementAction,
  TSelectElementsAction,
  TSetAreaCoordinatesAction,
  TSetElementCoordinatesAction,
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
import { handleSetElementCoordinates } from './utils/handleSetElementCoordinates';
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
    possibleIndexPosition: null,
    possibleParent: null,
    pressedKey: KeyboardKeys.none,
    selectedAnchorResize: AnchorResize.none,
  },
  isLoading: true,
  isPending: false,
  // @ts-ignore
  pages: {
    [BASE_PAGE.id]: {
      ...BASE_PAGE,
      elements: {
        allData: {
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
            children: ['mfmjnwh91758026628908'],
            coordinates: {
              x: 0,
              y: 0,
            },
            deepLevel: 0,
            height: 0,
            id: '-1',
            parentId: 'none',
            position: 'absolute',
            rotate: 0,
            type: 'base',
            width: 0,
          },
          mfmjnwh91758026628908: {
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
              x: 500,
              y: 299,
            },
            deepLevel: 0,
            height: 272,
            id: 'mfmjnwh91758026628908',
            parentId: '-1',
            position: 'absolute',
            rotate: 0,
            type: 'frame',
            width: 404,
          },
        },
        dynamicData: {
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
          mfmjnwh91758026628908: {
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
              x: 500,
              y: 299,
            },
            deepLevel: 0,
            height: 272,
            id: 'mfmjnwh91758026628908',
            position: 'absolute',
            rotate: 0,
            width: 404,
          },
        },
        staticData: {
          '-1': {
            children: ['mfmjnwh91758026628908'],
            id: '-1',
            parentId: 'none',
            position: 'absolute',
            type: 'base',
          },
          mfmjnwh91758026628908: {
            children: [],
            id: 'mfmjnwh91758026628908',
            parentId: '-1',
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

const setElementCoordinates = (
  state: TPageBuilderState,
  {
    payload: { coordinates, id },
  }: TAction<TSetElementCoordinatesAction['payload']>,
): TPageBuilderState => handleSetElementCoordinates(coordinates, id, state);

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
    case SET_ELEMENT_COORDINATES:
      return setElementCoordinates(state, action);
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
