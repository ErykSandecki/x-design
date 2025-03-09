import { omit } from 'lodash';

// others
import {
  ADD_ELEMENT,
  SELECT_ELEMENT,
  UNSELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
} from './actionsType';
import { BASE_3D } from 'shared';

// types
import { TAction } from 'types';
import {
  TAddELementAction,
  TSelectElementAction,
  TPageBuilderState,
  TUnselectElementAction,
  TSelectElementsAction,
  TSetAreaCoordinatesAction,
} from './types';

// utils
import { handleAddElement } from './utils/handleAddElement';

const initialState: TPageBuilderState = {
  areaCoordinates: BASE_3D,
  elements: { allData: {}, dynamicData: {}, staticData: {} },
  isLoading: true,
  isPending: false,
  selectedElements: {},
};

const addElement = (
  state: TPageBuilderState,
  { payload: element }: TAction<TAddELementAction['payload']>,
): TPageBuilderState => handleAddElement(element, state);

const selectElement = (
  state: TPageBuilderState,
  { payload: selectedElement }: TAction<TSelectElementAction['payload']>,
): TPageBuilderState => ({
  ...state,
  selectedElements: {
    ...state.selectedElements,
    [selectedElement.id]: selectedElement,
  },
});

const selectElements = (
  state: TPageBuilderState,
  { payload: selectedElements }: TAction<TSelectElementsAction['payload']>,
): TPageBuilderState => ({ ...state, selectedElements });

const setAreCoordinates = (
  state: TPageBuilderState,
  { payload: areaCoordinates }: TAction<TSetAreaCoordinatesAction['payload']>,
): TPageBuilderState => ({
  ...state,
  areaCoordinates: { ...state.areaCoordinates, ...areaCoordinates },
});

const unselectElement = (
  state: TPageBuilderState,
  { payload: id }: TAction<TUnselectElementAction['payload']>,
): TPageBuilderState => ({
  ...state,
  selectedElements: omit(state.selectedElements, id),
});

const pageBuilder = (
  state: TPageBuilderState = initialState,
  action: TAction,
): TPageBuilderState => {
  switch (action.type) {
    case ADD_ELEMENT:
      return addElement(state, action);
    case SELECT_ELEMENT:
      return selectElement(state, action);
    case SELECT_ELEMENTS:
      return selectElements(state, action);
    case SET_AREA_COORDINATES:
      return setAreCoordinates(state, action);
    case UNSELECT_ELEMENT:
      return unselectElement(state, action);
    default:
      return state;
  }
};

export default pageBuilder;
