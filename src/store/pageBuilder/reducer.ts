// @ts-nocheck
// others
import {
  ADD_ELEMENT,
  CHANGE_ALIGNMENT,
  CHANGE_BACKGROUND,
  CHANGE_LAYOUT,
  CHANGE_PARENT,
  CHANGE_POSITION,
  CLEAR_PREV_STATE,
  FIT_LAYOUT,
  FLIP_ELEMENTS,
  REDUCER_HISTORY_REDO,
  REDUCER_HISTORY_SAVE,
  REDUCER_HISTORY_UNDO,
  ROTATE_ELEMENTS,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
  RESIZE_ELEMENT,
  SET_ELEMENTS_COORDINATES,
  UNSELECT_ELEMENT,
  UPDATE_EVENTS_STATUS,
  UPDATE_PREV_STATE,
  SET_ELEMENTS_SIZES,
  APPLY_ELEMENTS_SIZE_TYPE,
  SET_ELEMENTS_SIZES_MIN_MAX,
  SET_ELEMENTS_SCORE_TO_CURRENT_SIZE,
  TOGGLE_ASPECT_RATIO,
  CHANGE_LAYOUT_ALIGNMENT,
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
  TUpdateEventsStatusAction,
  TResizeElementAction,
  TRotateElementsAction,
  TChangeBackgroundAction,
  TReducerHistorySaveAction,
  TChangeAlignmentAction,
  TFlipElementsAction,
  TChangeLayoutAction,
  TSetElementsCoordinatesAction,
  TSetElementsSizesAction,
  TApplyElementsSizeTypeAction,
  TSetElementsSizesMinMaxAction,
  TSetElementsScoreToCurrentSizeAction,
  TChangeLayoutAlignmentAction,
} from './types';

// utils
import { filterSelectedElements } from './utils/filterSelectedElements';
import { handleAddElement } from './utils/handleAddElement';
import { handleApplyElementsSizeType } from './utils/applyElementsSizeType/handleApplyElementsSizeType';
import { handleChangeAlignment } from './utils/changeAligment/handleChangeAlignment';
import { handleChangeBackground } from './utils/handleChangeBackground';
import { handleChangeLayout } from './utils/handleChangeLayout';
import { handleChangeLayoutAlignment } from './utils/handleChangeLayoutAlignment';
import { handleChangeParent } from './utils/changeParent/handleChangeParent';
import { handleChangePosition } from './utils/handleChangePosition';
import { handleFitLayout } from './utils/handleFitLayout';
import { handleFlipElements } from './utils/handleFlipElements';
import { handleReducerHistoryRedo } from './utils/reducerHistory/handleReducerHistoryRedo';
import { handleReducerHistorySave } from './utils/reducerHistory/handleReducerHistorySave';
import { handleReducerHistoryUndo } from './utils/reducerHistory/handleReducerHistoryUndo';
import { handleResizeElement } from './utils/resizeElement/handleResizeElement';
import { handleRotateElements } from './utils/handleRotateElements';
import { handleSetElementsCoordinates } from './utils/handleSetElementsCoordinates';
import { handleSetElementsScoreToCurrentSize } from './utils/handleSetElementsScoreToCurrentSize';
import { handleSetElementsSizes } from './utils/setElementSizes/handleSetElementsSizes';
import { handleSetElementsSizesMinMax } from './utils/handleSetElementsSizesMinMax';
import { handleToggleAspectRatio } from './utils/handleToggleAspectRatio';

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
    possibleAnchorElementId: '-1',
    possibleAnchorPosition: null,
    possibleElement: undefined,
    possibleIndexPosition: null,
    possibleParent: null,
    pressedKey: KeyboardKeys.none,
    selectedAnchorResize: AnchorResize.none,
    selectedAnchorRotate: AnchorRotate.none,
  },
  isLoading: true,
  isPending: false,
  pages: {
    [BASE_PAGE.id]: {
      ...BASE_PAGE,

      // @ts-ignore
      elements: {
        '-1': {
          alignment: {},
          angle: 0,
          aspectRatio: false,
          background: {
            properties: {
              alpha: '100',
              color: '#1e262f',
              format: 'hex',
            },
            visible: true,
          },
          children: [
            {
              id: 'mh37owtm1761211227945',
              type: 'frame',
            },
          ],
          coordinates: {
            x: 0,
            y: 0,
          },
          deepLevel: 0,
          flip: {
            x: false,
            y: false,
          },
          height: {
            value: 0,
          },
          id: '-1',
          layout: {
            alignment: 'none',
            type: 'freeForm',
          },
          parentId: '-1',
          position: 'absolute',
          type: 'base',
          width: {
            value: 0,
          },
        },
        mh37owtm1761211227945: {
          alignment: {},
          angle: 0,
          aspectRatio: false,
          background: {
            properties: {
              alpha: '100',
              color: '#ffffff',
              format: 'hex',
            },
            visible: true,
          },
          children: [
            {
              id: 'mh37oxqu1761211229142',
              type: 'frame',
            },
            {
              id: 'mh37ozll1761211231545',
              type: 'frame',
            },
            {
              id: 'mh37p14t1761211233533',
              type: 'frame',
            },
          ],
          coordinates: {
            x: 639,
            y: 265,
          },
          deepLevel: 1,
          flip: {
            x: false,
            y: false,
          },
          height: {
            value: 317,
          },
          id: 'mh37owtm1761211227945',
          layout: {
            alignment: 'topLeft',
            type: 'vertical',
          },
          parentId: '-1',
          position: 'absolute',
          type: 'frame',
          width: {
            value: 335,
          },
        },
        mh37oxqu1761211229142: {
          alignment: {},
          angle: 0,
          aspectRatio: false,
          background: {
            properties: {
              alpha: '100',
              color: '#d82424ff',
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
          flip: {
            x: false,
            y: false,
          },
          height: {
            value: 87,
          },
          id: 'mh37oxqu1761211229142',
          layout: {
            alignment: 'none',
            type: 'freeForm',
          },
          parentId: 'mh37owtm1761211227945',
          position: 'relative',
          type: 'frame',
          width: {
            value: 130,
          },
        },
        mh37ozll1761211231545: {
          alignment: {},
          angle: 0,
          aspectRatio: false,
          background: {
            properties: {
              alpha: '100',
              color: '#3d87b2ff',
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
          flip: {
            x: false,
            y: false,
          },
          height: {
            value: 75,
          },
          id: 'mh37ozll1761211231545',
          layout: {
            alignment: 'none',
            type: 'freeForm',
          },
          parentId: 'mh37owtm1761211227945',
          position: 'relative',
          type: 'frame',
          width: {
            value: 127,
          },
        },
        mh37p14t1761211233533: {
          alignment: {},
          angle: 0,
          aspectRatio: false,
          background: {
            properties: {
              alpha: '100',
              color: '#1c9b1aff',
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
          flip: {
            x: false,
            y: false,
          },
          height: {
            value: 95,
          },
          id: 'mh37p14t1761211233533',
          layout: {
            alignment: 'none',
            type: 'freeForm',
          },
          parentId: 'mh37owtm1761211227945',
          position: 'relative',
          type: 'frame',
          width: {
            value: 92,
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

const applyElementsSizeType = (
  state: TPageBuilderState,
  { payload }: TAction<TApplyElementsSizeTypeAction['payload']>,
): TPageBuilderState => handleApplyElementsSizeType(payload, state);

const changeAlignment = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeAlignmentAction['payload']>,
): TPageBuilderState => handleChangeAlignment(payload, state);

const changeBackground = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeBackgroundAction['payload']>,
): TPageBuilderState => handleChangeBackground(payload, state);

const changeLayout = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeLayoutAction['payload']>,
): TPageBuilderState => handleChangeLayout(payload, state);

const changeLayoutAlignment = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeLayoutAlignmentAction['payload']>,
): TPageBuilderState => handleChangeLayoutAlignment(payload, state);

const changeParent = (state: TPageBuilderState): TPageBuilderState => handleChangeParent(state);

const changePosition = (state: TPageBuilderState): TPageBuilderState => handleChangePosition(state);

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

const fitLayout = (state: TPageBuilderState): TPageBuilderState => handleFitLayout(state);

const flipElements = (
  state: TPageBuilderState,
  { payload }: TAction<TFlipElementsAction['payload']>,
): TPageBuilderState => handleFlipElements(payload, state);

const reducerHistoryRedo = (state: TPageBuilderState): TPageBuilderState => handleReducerHistoryRedo(state);

const reducerHistorySave = (
  state: TPageBuilderState,
  { payload }: TAction<TReducerHistorySaveAction['payload']>,
): TPageBuilderState => handleReducerHistorySave(state, payload);

const reducerHistoryUndo = (state: TPageBuilderState): TPageBuilderState => handleReducerHistoryUndo(state);

const resizeElement = (
  state: TPageBuilderState,
  { payload: { baseCoordinates, flip, height, id, mouseCoordinates, width } }: TAction<TResizeElementAction['payload']>,
): TPageBuilderState => handleResizeElement(baseCoordinates, flip, height, width, id, mouseCoordinates, state);

const rotateElements = (
  state: TPageBuilderState,
  { payload }: TAction<TRotateElementsAction['payload']>,
): TPageBuilderState => handleRotateElements(payload, state);

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

const setElementsCoordinates = (
  state: TPageBuilderState,
  { payload: coordinates }: TAction<TSetElementsCoordinatesAction['payload']>,
): TPageBuilderState => handleSetElementsCoordinates(coordinates, state);

const setElementsScoreToCurrentSize = (
  state: TPageBuilderState,
  { payload: { scoreType, sizeType } }: TAction<TSetElementsScoreToCurrentSizeAction['payload']>,
): TPageBuilderState => handleSetElementsScoreToCurrentSize(scoreType, sizeType, state);

const setElementsSizes = (
  state: TPageBuilderState,
  { payload: { sizeType, value } }: TAction<TSetElementsSizesAction['payload']>,
): TPageBuilderState => handleSetElementsSizes(sizeType, state, value);

const setElementsSizesMinMax = (
  state: TPageBuilderState,
  { payload: { scoreType, sizeType, value } }: TAction<TSetElementsSizesMinMaxAction['payload']>,
): TPageBuilderState => handleSetElementsSizesMinMax(scoreType, sizeType, state, value);

const toggleAspectRatio = (state: TPageBuilderState): TPageBuilderState => handleToggleAspectRatio(state);

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
      selectedElements: state.pages[state.currentPage].selectedElements.filter((element) => element.id !== id),
    },
  },
});

const pageBuilder = (state: TPageBuilderState = initialState, action: TAction): TPageBuilderState => {
  switch (action.type) {
    case ADD_ELEMENT:
      return addElement(state, action);
    case APPLY_ELEMENTS_SIZE_TYPE:
      return applyElementsSizeType(state, action);
    case CHANGE_ALIGNMENT:
      return changeAlignment(state, action);
    case CHANGE_BACKGROUND:
      return changeBackground(state, action);
    case CHANGE_LAYOUT:
      return changeLayout(state, action);
    case CHANGE_LAYOUT_ALIGNMENT:
      return changeLayoutAlignment(state, action);
    case CHANGE_PARENT:
      return changeParent(state);
    case CHANGE_POSITION:
      return changePosition(state);
    case CLEAR_PREV_STATE:
      return clearPrevState(state);
    case FIT_LAYOUT:
      return fitLayout(state);
    case FLIP_ELEMENTS:
      return flipElements(state, action);
    case REDUCER_HISTORY_REDO:
      return reducerHistoryRedo(state);
    case REDUCER_HISTORY_SAVE:
      return reducerHistorySave(state, action);
    case REDUCER_HISTORY_UNDO:
      return reducerHistoryUndo(state);
    case RESIZE_ELEMENT:
      return resizeElement(state, action);
    case ROTATE_ELEMENTS:
      return rotateElements(state, action);
    case SELECT_ELEMENT:
      return selectElement(state, action);
    case SELECT_ELEMENTS:
      return selectElements(state, action);
    case SET_AREA_COORDINATES:
      return setAreaCoordinates(state, action);
    case SET_ELEMENTS_COORDINATES:
      return setElementsCoordinates(state, action);
    case SET_ELEMENTS_SCORE_TO_CURRENT_SIZE:
      return setElementsScoreToCurrentSize(state, action);
    case SET_ELEMENTS_SIZES:
      return setElementsSizes(state, action);
    case SET_ELEMENTS_SIZES_MIN_MAX:
      return setElementsSizesMinMax(state, action);
    case TOGGLE_ASPECT_RATIO:
      return toggleAspectRatio(state);
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
