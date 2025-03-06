// others
import {
  ADD_ELEMENT,
  ADD_SELECTED_ELEMENT,
  REMOVE_SELECTED_ELEMENT,
  SET_SELECTED_ELEMENTS,
} from './actionsType';

// types
import {
  TAddELementAction,
  TAddELementActionPayload,
  TAddSelectedElementAction,
  TRemoveSelectedElementAction,
  TSetSelectedElementsAction,
} from './types';

export const addElement = (
  payload: TAddELementActionPayload,
): TAddELementAction => ({
  payload,
  type: ADD_ELEMENT,
});

export const addSelectedElement = (
  payload: TAddSelectedElementAction['payload'],
): TAddSelectedElementAction => ({
  payload,
  type: ADD_SELECTED_ELEMENT,
});

export const removeSelectedElement = (
  payload: TRemoveSelectedElementAction['payload'],
): TRemoveSelectedElementAction => ({
  payload,
  type: REMOVE_SELECTED_ELEMENT,
});

export const setSelectedElements = (
  payload: TSetSelectedElementsAction['payload'],
): TSetSelectedElementsAction => ({
  payload,
  type: SET_SELECTED_ELEMENTS,
});
