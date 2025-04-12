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
  ROTATE_ELEMENT,
  CHANGE_PARENT,
  UPDATE_PREV_STATE,
} from './actionsType';
import { BASE_3D } from 'shared';
import { BASE_ALL_DATA, BASE_STATIC_DATA } from './constants';

// types
import { Anchor } from './enums';
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
  TRotateElementAction,
  TChangeParentAction,
} from './types';

// utils
import { handleAddElement } from './utils/handleAddElement';
import { handleChangeParent } from './utils/changeParent/handleChangeParent';
import { handleRotateElement } from './utils/handleRotateElement';
import { handleSetElementCoordinates } from './utils/handleSetElementCoordinates';
import { handleSetElementsCoordinates } from './utils/handleSetElementsCoordinates';
import { handleSetElementSizes } from './utils/handleSetElementSize';
import { filterSelectedElements } from './utils/filterSelectedElements';

const initialState: TPageBuilderState = {
  areaCoordinates: BASE_3D,
  elements: {
    allData: {
      [BASE_ALL_DATA.id]: BASE_ALL_DATA,
      m861mgpj1741791393558: {
        children: [],
        backgroundColor: '#ffffff',
        height: 325,
        id: 'm861mgpj1741791393558',
        parentId: '-1',
        coordinates: {
          x: 500,
          y: 324,
        },
        position: 'absolute',
        rotate: 0,
        // @ts-ignore
        type: 'frame',
        width: 500,
        index: 0,
      },
      m861mgpj17417913935518: {
        children: [],
        backgroundColor: 'red',
        height: 150,
        id: 'm861mgpj17417913935518',
        parentId: '-1',
        position: 'absolute',
        coordinates: {
          x: 0,
          y: 0,
        },
        rotate: 0,
        // @ts-ignore
        type: 'frame',
        width: 250,
        index: 0,
      },
    },
    dynamicData: {
      m861mgpj1741791393558: {
        backgroundColor: '#ffffff',
        height: 325,
        id: 'm861mgpj1741791393558',
        coordinates: {
          x: 500,
          y: 324,
        },
        position: 'absolute',
        rotate: 0,
        width: 500,
      },
      m861mgpj17417913935518: {
        backgroundColor: 'red',
        height: 150,
        id: 'm861mgpj17417913935518',
        coordinates: {
          x: 0,
          y: 0,
        },
        position: 'absolute',
        rotate: 0,
        width: 250,
      },
    },
    staticData: {
      [BASE_STATIC_DATA.id]: BASE_STATIC_DATA,
      m861mgpj1741791393558: {
        children: [],
        id: 'm861mgpj1741791393558',
        parentId: '-1',
        // @ts-ignore
        type: 'frame',
        index: 0,
      },
      m861mgpj17417913935518: {
        children: [],
        id: 'm861mgpj17417913935518',
        parentId: '-1',
        // @ts-ignore
        type: 'frame',
        index: 0,
      },
    },
  },
  events: {
    draggableElements: [],
    isMultipleMoving: false,
    possibleIndexPosition: null,
    possibleParent: null,
    selectedAnchor: Anchor.none,
  },
  isLoading: true,
  isPending: false,
  prevState: undefined,
  selectedElements: {},
};

const addElement = (
  state: TPageBuilderState,
  { payload: element }: TAction<TAddELementAction['payload']>,
): TPageBuilderState => handleAddElement(element, state);

const changeParent = (
  state: TPageBuilderState,
  { payload }: TAction<TChangeParentAction['payload']>,
): TPageBuilderState => handleChangeParent(payload, state);

const rotateElement = (
  state: TPageBuilderState,
  { payload }: TAction<TRotateElementAction['payload']>,
): TPageBuilderState => handleRotateElement(payload, state);

const selectElement = (
  state: TPageBuilderState,
  { payload: selectedElement }: TAction<TSelectElementAction['payload']>,
): TPageBuilderState => ({
  ...state,
  selectedElements: filterSelectedElements({
    ...state.selectedElements,
    [selectedElement.id]: selectedElement,
  }),
});

const selectElements = (
  state: TPageBuilderState,
  { payload: selectedElements }: TAction<TSelectElementsAction['payload']>,
): TPageBuilderState => ({
  ...state,
  selectedElements: filterSelectedElements(selectedElements),
});

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
    payload: { id, coordinates: position },
  }: TAction<TSetElementCoordinatesAction['payload']>,
): TPageBuilderState => handleSetElementCoordinates(id, position, state);

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
});

const updatePrevState = (state: TPageBuilderState): TPageBuilderState => ({
  ...state,
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
    case CHANGE_PARENT:
      return changeParent(state, action);
    case ROTATE_ELEMENT:
      return rotateElement(state, action);
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
    case UPDATE_PREV_STATE:
      return updatePrevState(state);
    case UNSELECT_ELEMENT:
      return unselectElement(state, action);
    default:
      return state;
  }
};

export default pageBuilder;
