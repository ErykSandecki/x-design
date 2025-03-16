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
  SET_ELEMENT_SIZES,
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
  TSetElementSizesAction,
} from './types';

// utils
import { handleAddElement } from './utils/handleAddElement';
import { handleSetElementCoordinates } from './utils/handleSetElementCoordinates';
import { handleSetElementsCoordinates } from './utils/handleSetElementsCoordinates';
import { handleSetElementSizes } from './utils/handleSetElementSize';
import { Anchor } from './enums';

const initialState: TPageBuilderState = {
  areaCoordinates: BASE_3D,
  elements: {
    allData: {
      m861mgpj1741791393558: {
        height: 325,
        id: 'm861mgpj1741791393558',
        parentId: '-1',
        positionAbsolute: {
          x: 500,
          y: 324,
        },
        positionRelative: {
          x: 500,
          y: 324,
        },
        rotate: 0,
        // @ts-ignore
        type: 'frame',
        width: 500,
        index: 0,
      },
    },
    dynamicData: {
      m861mgpj1741791393558: {
        height: 325,
        id: 'm861mgpj1741791393558',
        positionAbsolute: {
          x: 500,
          y: 324,
        },
        positionRelative: {
          x: 500,
          y: 324,
        },
        rotate: 0,
        width: 500,
      },
    },
    staticData: {
      m861mgpj1741791393558: {
        id: 'm861mgpj1741791393558',
        parentId: '-1',
        // @ts-ignore
        type: 'frame',
        index: 0,
      },
    },
  },
  events: { isMultipleMoving: false, selectedAnchor: Anchor.none },
  isLoading: true,
  isPending: false,
  prevState: undefined,
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

const setElementSizes = (
  state: TPageBuilderState,
  {
    payload: { baseCoordinates, height, id, mouseCoordinates, width },
  }: TAction<TSetElementSizesAction['payload']>,
): TPageBuilderState =>
  handleSetElementSizes(
    baseCoordinates,
    height,
    width,
    id,
    mouseCoordinates,
    state,
  );

const setElementsCoordinates = (
  state: TPageBuilderState,
  { payload: coordinates }: TAction<TSetElementsCoordinatesAction['payload']>,
): TPageBuilderState => handleSetElementsCoordinates(coordinates, state);

const updateEventsStatus = (
  state: TPageBuilderState,
  { payload: events }: TAction<TUpdateEventsStatusAction['payload']>,
): TPageBuilderState => ({
  ...state,
  events: {
    ...state.events,
    ...events,
  },
  prevState: state,
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
    case SET_ELEMENT_SIZES:
      return setElementSizes(state, action);
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
