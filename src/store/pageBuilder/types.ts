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
  'height' | 'id' | 'positionAbsolute' | 'positionRelative' | 'rotate' | 'width'
>;

export type TElementStaticData = Pick<
  TElement,
  'id' | 'index' | 'parentId' | 'type'
>;

export type TElementsData = {
  allData: TObject<TElement>;
  dynamicData: TObject<TElementDynamicData>;
  staticData: TObject<TElementStaticData>;
};

export type TEvents = {
  isMultipleMoving: boolean;
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
  'height' | 'positionAbsolute' | 'width'
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
  'id' | 'positionAbsolute'
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

export type TUnselectElementAction = {
  payload: TElement['id'];
  type: typeof UNSELECT_ELEMENT;
};
