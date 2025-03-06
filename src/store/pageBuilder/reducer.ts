// others
import { ADD_ELEMENT, SET_SELECTED_ELEMENTS } from './actionsType';

// types
import { TAction } from 'types';
import {
  TAddELementAction,
  TPageBuilderState,
  TSetSelectedElementsAction,
} from './types';

// utils
import { handleAddElement } from './utils/handleAddElement';

const initialState: TPageBuilderState = {
  elements: { dynamicData: {}, staticData: {} },
  isLoading: true,
  isPending: false,
  selectedElements: {},
};

const addElement = (
  state: TPageBuilderState,
  { payload: element }: TAction<TAddELementAction['payload']>,
): TPageBuilderState => handleAddElement(element, state);

const setSelectedElements = (
  state: TPageBuilderState,
  { payload: selectedElements }: TAction<TSetSelectedElementsAction['payload']>,
): TPageBuilderState => ({ ...state, selectedElements });

const pageBuilder = (
  state: TPageBuilderState = initialState,
  action: TAction,
): TPageBuilderState => {
  switch (action.type) {
    case ADD_ELEMENT:
      return addElement(state, action);
    case SET_SELECTED_ELEMENTS:
      return setSelectedElements(state, action);
    default:
      return state;
  }
};

export default pageBuilder;
