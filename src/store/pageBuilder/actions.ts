// others
import { ADD_ELEMENT } from './actionsType';

// types
import { TAddELementAction } from './types';

export const addElement = (
  payload: TAddELementAction['payload'],
): TAddELementAction => ({
  payload,
  type: ADD_ELEMENT,
});
