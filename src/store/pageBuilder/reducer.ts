// others
import {
  ADD_ELEMENT,
  ADD_SELECTED_ELEMENT,
  REMOVE_SELECTED_ELEMENT,
  SET_SELECTED_ELEMENTS,
} from './actionsType';

// types
import { TAction } from 'types';
import {
  TAddELementAction,
  TAddSelectedElementAction,
  TPageBuilderState,
  TRemoveSelectedElementAction,
  TSetSelectedElementsAction,
} from './types';

// utils
import { handleAddElement } from './utils/handleAddElement';
import { omit } from 'lodash';

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

const addSelectedElement = (
  state: TPageBuilderState,
  { payload: selectedElement }: TAction<TAddSelectedElementAction['payload']>,
): TPageBuilderState => ({
  ...state,
  selectedElements: {
    ...state.selectedElements,
    [selectedElement.id]: selectedElement,
  },
});

const removeSelectedElement = (
  state: TPageBuilderState,
  { payload: id }: TAction<TRemoveSelectedElementAction['payload']>,
): TPageBuilderState => ({
  ...state,
  selectedElements: omit(state.selectedElements, id),
});

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
    case ADD_SELECTED_ELEMENT:
      return addSelectedElement(state, action);
    case REMOVE_SELECTED_ELEMENT:
      return removeSelectedElement(state, action);
    case SET_SELECTED_ELEMENTS:
      return setSelectedElements(state, action);
    default:
      return state;
  }
};

export default pageBuilder;
