// others
import { ADD_ELEMENT } from './actionsType';

// types
import { TAction } from 'types';
import { TAddELementAction, TPageBuilderState } from './types';

// utils
import { handleAddElement } from './utils/handleAddElement';

const initialState: TPageBuilderState = {
  elements: { dynamicData: [], staticData: [] },
  isLoading: true,
  isPending: false,
};

const addElement = (
  state: TPageBuilderState,
  { payload: element }: TAction<TAddELementAction['payload']>,
): TPageBuilderState => handleAddElement(element, state);

const pageBuilder = (
  state: TPageBuilderState = initialState,
  action: TAction,
): TPageBuilderState => {
  switch (action.type) {
    case ADD_ELEMENT:
      return addElement(state, action);
    default:
      return state;
  }
};

export default pageBuilder;
