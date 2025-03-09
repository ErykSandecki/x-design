// others
import {
  ADD_ELEMENT,
  SELECT_ELEMENT,
  UNSELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
} from './actionsType';

// types
import {
  TAddELementAction,
  TAddELementActionPayload,
  TSelectElementAction,
  TUnselectElementAction,
  TSelectElementsAction,
  TSetAreaCoordinatesAction,
} from './types';

export const addElement = (
  payload: TAddELementActionPayload,
): TAddELementAction => ({
  payload,
  type: ADD_ELEMENT,
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

export const unselectElement = (
  payload: TUnselectElementAction['payload'],
): TUnselectElementAction => ({
  payload,
  type: UNSELECT_ELEMENT,
});
