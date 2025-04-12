// others
import {
  ADD_ELEMENT,
  CHANGE_PARENT,
  ROTATE_ELEMENT,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
  SET_ELEMENT_COORDINATES,
  SET_ELEMENT_SIZES,
  SET_ELEMENTS_COORDINATES,
  UNSELECT_ELEMENT,
  UPDATE_EVENTS_STATUS,
  UPDATE_PREV_STATE,
} from './actionsType';

// types
import { Anchor } from './enums';
import {
  ElementType,
  T2DCoordinates,
  T3DCoordinates,
  TElement,
  TObject,
  TRectCoordinates,
} from 'types';

export type TElementDynamicData = Pick<
  TElement,
  | 'backgroundColor'
  | 'coordinates'
  | 'height'
  | 'id'
  | 'position'
  | 'rotate'
  | 'width'
>;

export type TElementStaticData = Pick<
  TElement,
  'children' | 'id' | 'parentId' | 'position' | 'type'
>;

export type TElementsData = {
  allData: TObject<TElement>;
  dynamicData: TObject<TElementDynamicData>;
  staticData: TObject<TElementStaticData>;
};

export type TEvents = {
  draggableElements: Array<TElement['id']>;
  hoverOnElement: TElement['id'];
  isMultipleMoving: boolean;
  possibleIndexPosition: number | null;
  possibleParent: TElement['id'] | null;
  selectedAnchor: Anchor;
};

export type TPositions = {
  allData: TElementsData['allData'];
  dynamicData: TElementsData['dynamicData'];
  selectedElements: TSelectedElements;
};

export type TSelectedElement = {
  coordinates: TRectCoordinates;
  id: TElement['id'];
  parentId: TElement['parentId'];
  type: ElementType;
};

export type TSelectedElements = TObject<TSelectedElement>;

export type TSizeCoordinates = Pick<
  TElement,
  'coordinates' | 'height' | 'width'
>;

export type TPageBuilderState = {
  areaCoordinates: T3DCoordinates;
  elements: TElementsData;
  events: TEvents;
  isLoading: boolean;
  isPending: boolean;
  prevState: TPageBuilderState;
  selectedElements: TSelectedElements;
};

export type TAddELementActionPayload = Omit<TElement, 'index'>;

export type TAddELementAction = {
  payload: TAddELementActionPayload;
  type: typeof ADD_ELEMENT;
};

export type TChangeParentActionPayload = Pick<
  TEvents,
  'draggableElements' | 'possibleIndexPosition' | 'possibleParent'
>;

export type TChangeParentAction = {
  payload: TChangeParentActionPayload;
  type: typeof CHANGE_PARENT;
};

export type TRotateElementActionPayload = Pick<TElement, 'id' | 'rotate'>;

export type TRotateElementAction = {
  payload: TRotateElementActionPayload;
  type: typeof ROTATE_ELEMENT;
};

export type TSelectElementAction = {
  payload: TSelectedElement;
  type: typeof SELECT_ELEMENT;
};

export type TSelectElementsAction = {
  payload: TSelectedElements;
  type: typeof SELECT_ELEMENTS;
};

export type TSetAreaCoordinatesAction = {
  payload: Partial<T3DCoordinates>;
  type: typeof SET_AREA_COORDINATES;
};

export type TSetElementCoordinatesActionPayload = Pick<
  TElement,
  'coordinates' | 'id'
>;

export type TSetElementCoordinatesAction = {
  payload: TSetElementCoordinatesActionPayload;
  type: typeof SET_ELEMENT_COORDINATES;
};

export type TSetElementSizesActionPayload = Pick<
  TElement,
  'height' | 'id' | 'width'
> & {
  baseCoordinates: TRectCoordinates;
  mouseCoordinates: T2DCoordinates;
};

export type TSetElementSizesAction = {
  payload: TSetElementSizesActionPayload;
  type: typeof SET_ELEMENT_SIZES;
};

export type TSetElementsCoordinatesAction = {
  payload: T2DCoordinates;
  type: typeof SET_ELEMENTS_COORDINATES;
};

export type TUpdateEventsStatusAction = {
  payload: Partial<TEvents>;
  type: typeof UPDATE_EVENTS_STATUS;
};

export type TUpdatePrevStateAction = {
  type: typeof UPDATE_PREV_STATE;
};

export type TUnselectElementAction = {
  payload: TElement['id'];
  type: typeof UNSELECT_ELEMENT;
};
