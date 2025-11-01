// others
import {
  ADD_ELEMENT,
  APPLY_ELEMENTS_INSET_TYPE,
  APPLY_ELEMENTS_SIZE_MIN_MAX_TYPE,
  CHANGE_ALIGNMENT,
  CHANGE_BACKGROUND,
  CHANGE_LAYOUT,
  CHANGE_PARENT,
  CHANGE_POSITION,
  CLEAR_PREV_STATE,
  CHANGE_LAYOUT_BOX_SIZING,
  CHANGE_LAYOUT_GRID,
  CHANGE_INSETS,
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
  SET_ELEMENTS_GAP,
  APPLY_ELEMENTS_GAP_TYPE,
  CHANGE_CLIP_CONTENT,
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
  TSetElementsGapAction,
  TApplyElementsGapTypeAction,
  TChangeLayoutBoxSizingAction,
  TChangeLayoutGridAction,
  TChangeInsetsAction,
  TApplyElementsInsetTypeAction,
  TApplyElementsSizeMinMaxTypeAction,
  TChangeClipContentAction,
} from './types';

// utils
import { filterSelectedElements } from './utils/filterSelectedElements';
import { handleAddElement } from './utils/handleAddElement';
import { handleApplyElementsGapType } from './utils/applyElementsGapType/handleApplyElementsGapType';
import { handleApplyElementsInsetType } from './utils/applyElementsInsetType/handleApplyElementsInsetType';
import { handleApplyElementsSizeMinMaxType } from './utils/applyElementsSizeMinMaxType/handleApplyElementsSizeMinMaxType';
import { handleApplyElementsSizeType } from './utils/applyElementsSizeType/handleApplyElementsSizeType';
import { handleChangeAlignment } from './utils/changeAligment/handleChangeAlignment';
import { handleChangeBackground } from './utils/handleChangeBackground';
import { handleChangeClipContent } from './utils/handleChangeClipContent';
import { handleChangeInsets } from './utils/handleChangeInsets';
import { handleChangeLayout } from './utils/changeLayout/handleChangeLayout';
import { handleChangeLayoutAlignment } from './utils/handleChangeLayoutAlignment';
import { handleChangeLayoutBoxSizing } from './utils/handleChangeLayoutBoxSizing';
import { handleChangeLayoutGrid } from './utils/changeLayoutGrid/handleChangeLayoutGrid';
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
import { handleSetElementsGap } from './utils/handleSetElementsGap';
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
    isGridDropArea: false,
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
  // @ts-ignore
  pages: {
    [BASE_PAGE.id]: {
      ...BASE_PAGE,
    },
  },
};

const addElement = (
  state: TPageBuilderState,
  { payload: element }: TAction<TAddELementAction['payload']>,
): TPageBuilderState => handleAddElement(element, state);

const applyElementsGapType = (
  state: TPageBuilderState,
  { payload }: TAction<TApplyElementsGapTypeAction['payload']>,
): TPageBuilderState => handleApplyElementsGapType(payload, state);

const applyElementsInsetType = (
  state: TPageBuilderState,
  { payload }: TAction<TApplyElementsInsetTypeAction['payload']>,
): TPageBuilderState => handleApplyElementsInsetType(payload, state);

const applyElementsSizeMinMaxType = (
  state: TPageBuilderState,
  { payload }: TAction<TApplyElementsSizeMinMaxTypeAction['payload']>,
): TPageBuilderState => handleApplyElementsSizeMinMaxType(payload, state);

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

const changeClipContent = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeClipContentAction['payload']>,
): TPageBuilderState => handleChangeClipContent(payload, state);

const changeInsets = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeInsetsAction['payload']>,
): TPageBuilderState => handleChangeInsets(payload, state);

const changeLayout = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeLayoutAction['payload']>,
): TPageBuilderState => handleChangeLayout(payload, state);

const changeLayoutAlignment = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeLayoutAlignmentAction['payload']>,
): TPageBuilderState => handleChangeLayoutAlignment(payload, state);

const changeLayoutBoxSizing = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeLayoutBoxSizingAction['payload']>,
): TPageBuilderState => handleChangeLayoutBoxSizing(payload, state);

const changeLayoutGrid = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeLayoutGridAction['payload']>,
): TPageBuilderState => handleChangeLayoutGrid(payload, state);

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

const setElementsGap = (
  state: TPageBuilderState,
  { payload }: TAction<TSetElementsGapAction['payload']>,
): TPageBuilderState => handleSetElementsGap(payload, state);

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
    case APPLY_ELEMENTS_GAP_TYPE:
      return applyElementsGapType(state, action);
    case APPLY_ELEMENTS_INSET_TYPE:
      return applyElementsInsetType(state, action);
    case APPLY_ELEMENTS_SIZE_MIN_MAX_TYPE:
      return applyElementsSizeMinMaxType(state, action);
    case APPLY_ELEMENTS_SIZE_TYPE:
      return applyElementsSizeType(state, action);
    case CHANGE_ALIGNMENT:
      return changeAlignment(state, action);
    case CHANGE_BACKGROUND:
      return changeBackground(state, action);
    case CHANGE_CLIP_CONTENT:
      return changeClipContent(state, action);
    case CHANGE_INSETS:
      return changeInsets(state, action);
    case CHANGE_LAYOUT:
      return changeLayout(state, action);
    case CHANGE_LAYOUT_ALIGNMENT:
      return changeLayoutAlignment(state, action);
    case CHANGE_LAYOUT_BOX_SIZING:
      return changeLayoutBoxSizing(state, action);
    case CHANGE_LAYOUT_GRID:
      return changeLayoutGrid(state, action);
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
    case SET_ELEMENTS_GAP:
      return setElementsGap(state, action);
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
