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

// types
import {
  TAddELementAction,
  TAddELementActionPayload,
  TChangeAlignmentAction,
  TChangeBackgroundAction,
  TChangeBackgroundActionPayload,
  TChangeParentAction,
  TChangeParentActionPayload,
  TChangePositionAction,
  TClearPrevStateAction,
  TReducerHistoryRedoAction,
  TReducerHistorySaveAction,
  TReducerHistoryUndoAction,
  TRotateElementAction,
  TRotateElementActionPayload,
  TSelectElementAction,
  TSelectElementsAction,
  TSetAreaCoordinatesAction,
  TSetElementsCoordinatesAction,
  TSetElementsCoordinatesActionPayload,
  TSetElementSizesAction,
  TSetElementSizesActionPayload,
  TUnselectElementAction,
  TUpdateEventsStatusAction,
  TUpdatePrevStateAction,
} from './types';

export const addElement = (
  payload: TAddELementActionPayload,
): TAddELementAction => ({
  payload,
  type: ADD_ELEMENT,
});

export const changeAlignment = (
  payload: TChangeAlignmentAction['payload'],
): TChangeAlignmentAction => ({
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

export const reducerHistoryRedo = (): TReducerHistoryRedoAction => ({
  type: REDUCER_HISTORY_REDO,
});

export const reducerHistorySave = (
  payload: TReducerHistorySaveAction['payload'],
): TReducerHistorySaveAction => ({
  payload,
  type: REDUCER_HISTORY_SAVE,
});

export const reducerHistoryUndo = (): TReducerHistoryUndoAction => ({
  type: REDUCER_HISTORY_UNDO,
});

export const rotateElement = (
  id: TRotateElementActionPayload['id'],
  rotate: TRotateElementActionPayload['rotate'],
): TRotateElementAction => ({
  payload: { id, rotate },
  type: ROTATE_ELEMENT,
});

export const selectElement = (
  payload: TSelectElementAction['payload'],
): TSelectElementAction => ({
  payload,
  type: SELECT_ELEMENT,
});

export const selectElements = (
  payload: TSelectElementsAction['payload'],
): TSelectElementsAction => ({
  payload,
  type: SELECT_ELEMENTS,
});

export const setAreCoordinates = (
  payload: TSetAreaCoordinatesAction['payload'],
): TSetAreaCoordinatesAction => ({
  payload,
  type: SET_AREA_COORDINATES,
});

export const setElementSizes = (
  baseCoordinates: TSetElementSizesActionPayload['baseCoordinates'],
  height: TSetElementSizesActionPayload['height'],
  id: TSetElementSizesActionPayload['id'],
  mouseCoordinates: TSetElementSizesActionPayload['mouseCoordinates'],
  width: TSetElementSizesActionPayload['width'],
): TSetElementSizesAction => ({
  payload: { baseCoordinates, height, id, mouseCoordinates, width },
  type: SET_ELEMENT_SIZES,
});

export const setElementsCoordinates = (
  coordinates: TSetElementsCoordinatesActionPayload['coordinates'],
  mode: TSetElementsCoordinatesActionPayload['mode'],
): TSetElementsCoordinatesAction => ({
  payload: { coordinates, mode },
  type: SET_ELEMENTS_COORDINATES,
});

export const updateEventsStatus = (
  payload: TUpdateEventsStatusAction['payload'],
): TUpdateEventsStatusAction => ({
  payload,
  type: UPDATE_EVENTS_STATUS,
});

export const updatePrevState = (): TUpdatePrevStateAction => ({
  type: UPDATE_PREV_STATE,
});

export const unselectElement = (
  payload: TUnselectElementAction['payload'],
): TUnselectElementAction => ({
  payload,
  type: UNSELECT_ELEMENT,
});
