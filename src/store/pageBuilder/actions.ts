// others
import {
  ADD_ELEMENT,
  APPLY_ELEMENTS_SIZE_TYPE,
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
  RESIZE_ELEMENT,
  ROTATE_ELEMENTS,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
  SET_ELEMENTS_COORDINATES,
  SET_ELEMENTS_SCORE_TO_CURRENT_SIZE,
  SET_ELEMENTS_SIZES,
  SET_ELEMENTS_SIZES_MIN_MAX,
  UNSELECT_ELEMENT,
  UPDATE_EVENTS_STATUS,
  UPDATE_PREV_STATE,
} from './actionsType';

// types
import {
  TAddELementAction,
  TAddELementActionPayload,
  TApplyElementsSizeTypeAction,
  TApplyElementsSizeTypeActionPaylad,
  TChangeAlignmentAction,
  TChangeBackgroundAction,
  TChangeBackgroundActionPayload,
  TChangeLayoutAction,
  TChangeParentAction,
  TChangeParentActionPayload,
  TChangePositionAction,
  TClearPrevStateAction,
  TFitLayoutAction,
  TFlipElementsAction,
  TReducerHistoryRedoAction,
  TReducerHistorySaveAction,
  TReducerHistoryUndoAction,
  TResizeElementAction,
  TResizeElementActionPayload,
  TRotateElementsAction,
  TSelectElementAction,
  TSelectElementsAction,
  TSetAreaCoordinatesAction,
  TSetElementsCoordinatesAction,
  TSetElementsCoordinatesActionPayload,
  TSetElementsScoreToCurrentSizeAction,
  TSetElementsScoreToCurrentSizeActionPayload,
  TSetElementsSizesAction,
  TSetElementsSizesActionPayload,
  TSetElementsSizesMinMaxAction,
  TSetElementsSizesMinMaxActionPayload,
  TUnselectElementAction,
  TUpdateEventsStatusAction,
  TUpdatePrevStateAction,
} from './types';

export const addElement = (payload: TAddELementActionPayload): TAddELementAction => ({
  payload,
  type: ADD_ELEMENT,
});

export const applyElementsSizeType = (
  sizeType: TApplyElementsSizeTypeActionPaylad['sizeType'],
  type: TApplyElementsSizeTypeActionPaylad['type'],
): TApplyElementsSizeTypeAction => ({
  payload: { sizeType, type },
  type: APPLY_ELEMENTS_SIZE_TYPE,
});

export const changeAlignment = (payload: TChangeAlignmentAction['payload']): TChangeAlignmentAction => ({
  payload,
  type: CHANGE_ALIGNMENT,
});

export const changeBackground = (
  background: TChangeBackgroundActionPayload['background'],
  id: TChangeBackgroundActionPayload['id'],
): TChangeBackgroundAction => ({
  payload: { background, id },
  type: CHANGE_BACKGROUND,
});

export const changeLayout = (layoutType: TChangeLayoutAction['payload']): TChangeLayoutAction => ({
  payload: layoutType,
  type: CHANGE_LAYOUT,
});

export const changeParent = (
  draggableElements: TChangeParentActionPayload['draggableElements'],
  possibleIndexPosition: TChangeParentActionPayload['possibleIndexPosition'],
  possibleParent: TChangeParentActionPayload['possibleParent'],
): TChangeParentAction => ({
  payload: { draggableElements, possibleIndexPosition, possibleParent },
  type: CHANGE_PARENT,
});

export const changePosition = (): TChangePositionAction => ({
  type: CHANGE_POSITION,
});

export const clearPrevState = (): TClearPrevStateAction => ({
  type: CLEAR_PREV_STATE,
});

export const fitLayout = (): TFitLayoutAction => ({
  type: FIT_LAYOUT,
});

export const flipElements = (layoutType: TFlipElementsAction['payload']): TFlipElementsAction => ({
  payload: layoutType,
  type: FLIP_ELEMENTS,
});

export const reducerHistoryRedo = (): TReducerHistoryRedoAction => ({
  type: REDUCER_HISTORY_REDO,
});

export const reducerHistorySave = (payload: TReducerHistorySaveAction['payload']): TReducerHistorySaveAction => ({
  payload,
  type: REDUCER_HISTORY_SAVE,
});

export const reducerHistoryUndo = (): TReducerHistoryUndoAction => ({
  type: REDUCER_HISTORY_UNDO,
});
export const resizeElement = (
  baseCoordinates: TResizeElementActionPayload['baseCoordinates'],
  height: TResizeElementActionPayload['height'],
  id: TResizeElementActionPayload['id'],
  mouseCoordinates: TResizeElementActionPayload['mouseCoordinates'],
  width: TResizeElementActionPayload['width'],
): TResizeElementAction => ({
  payload: { baseCoordinates, height, id, mouseCoordinates, width },
  type: RESIZE_ELEMENT,
});

export const rotateElements = (angle: TRotateElementsAction['payload']): TRotateElementsAction => ({
  payload: angle,
  type: ROTATE_ELEMENTS,
});

export const selectElement = (payload: TSelectElementAction['payload']): TSelectElementAction => ({
  payload,
  type: SELECT_ELEMENT,
});

export const selectElements = (payload: TSelectElementsAction['payload']): TSelectElementsAction => ({
  payload,
  type: SELECT_ELEMENTS,
});

export const setAreCoordinates = (payload: TSetAreaCoordinatesAction['payload']): TSetAreaCoordinatesAction => ({
  payload,
  type: SET_AREA_COORDINATES,
});

export const setElementsCoordinates = (
  coordinates: TSetElementsCoordinatesActionPayload['coordinates'],
  mode: TSetElementsCoordinatesActionPayload['mode'],
): TSetElementsCoordinatesAction => ({
  payload: { coordinates, mode },
  type: SET_ELEMENTS_COORDINATES,
});

export const setElementsScoreToCurrentSize = (
  scoreType: TSetElementsScoreToCurrentSizeActionPayload['scoreType'],
  sizeType: TSetElementsScoreToCurrentSizeActionPayload['sizeType'],
): TSetElementsScoreToCurrentSizeAction => ({
  payload: { scoreType, sizeType },
  type: SET_ELEMENTS_SCORE_TO_CURRENT_SIZE,
});

export const setElementsSizes = (
  sizeType: TSetElementsSizesActionPayload['sizeType'],
  value: TSetElementsSizesActionPayload['value'],
): TSetElementsSizesAction => ({
  payload: { sizeType, value },
  type: SET_ELEMENTS_SIZES,
});

export const setElementsSizesMinMax = (
  scoreType: TSetElementsSizesMinMaxActionPayload['scoreType'],
  sizeType: TSetElementsSizesMinMaxActionPayload['sizeType'],
  value: TSetElementsSizesMinMaxActionPayload['value'],
): TSetElementsSizesMinMaxAction => ({
  payload: { scoreType, sizeType, value },
  type: SET_ELEMENTS_SIZES_MIN_MAX,
});

export const updateEventsStatus = (payload: TUpdateEventsStatusAction['payload']): TUpdateEventsStatusAction => ({
  payload,
  type: UPDATE_EVENTS_STATUS,
});

export const updatePrevState = (): TUpdatePrevStateAction => ({
  type: UPDATE_PREV_STATE,
});

export const unselectElement = (payload: TUnselectElementAction['payload']): TUnselectElementAction => ({
  payload,
  type: UNSELECT_ELEMENT,
});
