// others
import {
  ADD_ELEMENT,
  SELECT_ELEMENT,
  UNSELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
  SET_ELEMENT_COORDINATES,
  SET_ELEMENTS_COORDINATES,
  UPDATE_EVENTS_STATUS,
  SET_ELEMENT_SIZES,
} from './actionsType';

// types
import {
  TAddELementAction,
  TAddELementActionPayload,
  TSelectElementAction,
  TUnselectElementAction,
  TSelectElementsAction,
  TSetAreaCoordinatesAction,
  TSetElementCoordinatesAction,
  TSetElementCoordinatesActionPayload,
  TSetElementsCoordinatesAction,
  TUpdateEventsStatusAction,
  TSetElementSizesAction,
  TSetElementSizesActionPayload,
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

export const setElementCoordinates = (
  id: TSetElementCoordinatesActionPayload['id'],
  positionAbsolute: TSetElementCoordinatesActionPayload['positionAbsolute'],
): TSetElementCoordinatesAction => ({
  payload: { id, positionAbsolute },
  type: SET_ELEMENT_COORDINATES,
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
  payload: TSetElementsCoordinatesAction['payload'],
): TSetElementsCoordinatesAction => ({
  payload,
  type: SET_ELEMENTS_COORDINATES,
});

export const updateEventsStatus = (
  payload: TUpdateEventsStatusAction['payload'],
): TUpdateEventsStatusAction => ({
  payload,
  type: UPDATE_EVENTS_STATUS,
});

export const unselectElement = (
  payload: TUnselectElementAction['payload'],
): TUnselectElementAction => ({
  payload,
  type: UNSELECT_ELEMENT,
});
