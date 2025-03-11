import { omit } from 'lodash';

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
  TSetElementCoordinatesAction,
  TSetElementsCoordinatesAction,
  TUpdateEventsStatusAction,
} from './types';

// utils
import { handleAddElement } from './utils/handleAddElement';
import { handleSetElementCoordinates } from './utils/handleSetElementCoordinates';
import { handleSetElementsCoordinates } from './utils/handleSetElementsCoordinates';

const initialState: TPageBuilderState = {
  areaCoordinates: BASE_3D,
  elements: { allData: {}, dynamicData: {}, staticData: {} },
  events: { isMultipleMoving: false },
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

const setElementCoordinates = (
  state: TPageBuilderState,
  {
    payload: { id, positionAbsolute },
  }: TAction<TSetElementCoordinatesAction['payload']>,
): TPageBuilderState =>
  handleSetElementCoordinates(id, positionAbsolute, state);

const setElementsCoordinates = (
  state: TPageBuilderState,
  {
    payload: { coordinates, prevState },
  }: TAction<TSetElementsCoordinatesAction['payload']>,
): TPageBuilderState =>
  handleSetElementsCoordinates(coordinates, prevState, state);

const updateEventsStatus = (
  state: TPageBuilderState,
  { payload: events }: TAction<TUpdateEventsStatusAction['payload']>,
): TPageBuilderState => ({
  ...state,
  events: {
    ...state.events,
    ...events,
  },
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
    case SET_ELEMENT_COORDINATES:
      return setElementCoordinates(state, action);
    case SET_ELEMENTS_COORDINATES:
      return setElementsCoordinates(state, action);
    case UPDATE_EVENTS_STATUS:
      return updateEventsStatus(state, action);
    case UNSELECT_ELEMENT:
      return unselectElement(state, action);
    default:
      return state;
  }
};

export default pageBuilder;
