// others
import {
  ADD_ELEMENT,
  CHANGE_ALIGNMENT,
  CHANGE_BACKGROUND,
  CHANGE_LAYOUT,
  CHANGE_PARENT,
  CHANGE_POSITION,
  CLEAR_PREV_STATE,
  CHANGE_LAYOUT_BOX_SIZING,
  CHANGE_LAYOUT_GRID,
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
  SET_ELEMENTS_SIZES_MIN_MAX,
  SET_ELEMENTS_SCORE_TO_CURRENT_SIZE,
  CHANGE_LAYOUT_ALIGNMENT,
  SET_ELEMENTS_GAP,
  UNSELECT_ELEMENTS,
  CHANGE_PROPERTIES,
  APPLY_ELEMENTS_TYPE,
  CHANGE_BACKGROUND_ORDER,
  ADD_VARIANT,
  REMOVE_VARIANT,
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
  TSetElementsSizesMinMaxAction,
  TSetElementsScoreToCurrentSizeAction,
  TChangeLayoutAlignmentAction,
  TSetElementsGapAction,
  TChangeLayoutBoxSizingAction,
  TChangeLayoutGridAction,
  TChangePropertiesAction,
  TApplyElementsTypeAction,
  TChangeBackgroundOrderAction,
  TAddVariantAction,
  TRemoveVariantAction,
} from './types';

// utils
import { filterSelectedElements } from './utils/filterSelectedElements';
import { handleAddElement } from './utils/handleAddElement';
import { handleAddVariant } from './utils/handleAddVariant';
import { handleApplyElementsType } from './utils/applyElementsType/handleApplyElementsType';
import { handleChangeAlignment } from './utils/changeAligment/handleChangeAlignment';
import { handleChangeBackground } from './utils/handleChangeBackground';
import { handleChangeBackgroundOrder } from './utils/handleChangeBackgroundOrder';
import { handleChangeLayout } from './utils/changeLayout/handleChangeLayout';
import { handleChangeLayoutAlignment } from './utils/handleChangeLayoutAlignment';
import { handleChangeLayoutBoxSizing } from './utils/handleChangeLayoutBoxSizing';
import { handleChangeLayoutGrid } from './utils/changeLayoutGrid/handleChangeLayoutGrid';
import { handleChangeParent } from './utils/changeParent/handleChangeParent';
import { handleChangePosition } from './utils/handleChangePosition';
import { handleFitLayout } from './utils/handleFitLayout';
import { handleFlipElements } from './utils/flipElements/handleFlipElements';
import { handleReducerHistoryRedo } from './utils/reducerHistory/handleReducerHistoryRedo';
import { handleReducerHistorySave } from './utils/reducerHistory/handleReducerHistorySave';
import { handleReducerHistoryUndo } from './utils/reducerHistory/handleReducerHistoryUndo';
import { handleRemoveVariant } from './utils/handleRemoveVariant';
import { handleResizeElement } from './utils/resizeElement/handleResizeElement';
import { handleRotateElements } from './utils/handleRotateElements';
import { handleSetElementsCoordinates } from './utils/handleSetElementsCoordinates';
import { handleSetElementsGap } from './utils/handleSetElementsGap';
import { handleSetElementsScoreToCurrentSize } from './utils/handleSetElementsScoreToCurrentSize';
import { handleSetElementsSizes } from './utils/setElementSizes/handleSetElementsSizes';
import { handleSetElementsSizesMinMax } from './utils/handleSetElementsSizesMinMax';
import { handleChangeProperties } from './utils/handleChangeProperties';

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

const addVariant = (state: TPageBuilderState, { payload }: TAction<TAddVariantAction['payload']>): TPageBuilderState =>
  handleAddVariant(payload, state);

const applyElementsType = (
  state: TPageBuilderState,
  { payload }: TAction<TApplyElementsTypeAction['payload']>,
): TPageBuilderState => handleApplyElementsType(payload, state);

const changeAlignment = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeAlignmentAction['payload']>,
): TPageBuilderState => handleChangeAlignment(payload, state);

const changeBackground = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeBackgroundAction['payload']>,
): TPageBuilderState => handleChangeBackground(payload, state);

const changeBackgroundOrder = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeBackgroundOrderAction['payload']>,
): TPageBuilderState => handleChangeBackgroundOrder(payload, state);

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

const changeVisibility = (
  state: TPageBuilderState,
  { payload }: TAction<TChangePropertiesAction['payload']>,
): TPageBuilderState => handleChangeProperties(payload, state);

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

const removeVariant = (
  state: TPageBuilderState,
  { payload }: TAction<TRemoveVariantAction['payload']>,
): TPageBuilderState => handleRemoveVariant(payload, state);

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

const unselectElements = (state: TPageBuilderState): TPageBuilderState => ({
  ...state,
  pages: {
    ...state.pages,
    [state.currentPage]: {
      ...state.pages[state.currentPage],
      selectedElements: [],
    },
  },
});

const pageBuilder = (state: TPageBuilderState = initialState, action: TAction): TPageBuilderState => {
  switch (action.type) {
    case ADD_ELEMENT:
      return addElement(state, action);
    case ADD_VARIANT:
      return addVariant(state, action);
    case APPLY_ELEMENTS_TYPE:
      return applyElementsType(state, action);
    case CHANGE_ALIGNMENT:
      return changeAlignment(state, action);
    case CHANGE_BACKGROUND:
      return changeBackground(state, action);
    case CHANGE_BACKGROUND_ORDER:
      return changeBackgroundOrder(state, action);
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
    case CHANGE_PROPERTIES:
      return changeVisibility(state, action);
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
    case REMOVE_VARIANT:
      return removeVariant(state, action);
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
    case UPDATE_EVENTS_STATUS:
      return updateEventsStatus(state, action);
    case UPDATE_PREV_STATE:
      return updatePrevState(state);
    case UNSELECT_ELEMENT:
      return unselectElement(state, action);
    case UNSELECT_ELEMENTS:
      return unselectElements(state);
    default:
      return state;
  }
};

export default pageBuilder;
