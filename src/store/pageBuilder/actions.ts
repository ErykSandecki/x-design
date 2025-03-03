// others
import { ADD_ELEMENT, SET_SELECTED_ELEMENTS } from './actionsType';

// types
import { TAddELementAction, TSetSelectedElementsAction } from './types';

export const addElement = (
  payload: TAddELementAction['payload'],
): TAddELementAction => ({
  payload,
  type: ADD_ELEMENT,
});

export const setSelectedElements = (
  payload: TSetSelectedElementsAction['payload'],
): TSetSelectedElementsAction => ({
  payload,
  type: SET_SELECTED_ELEMENTS,
});
