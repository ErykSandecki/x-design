// others
import { ADD_ELEMENT, SET_SELECTED_ELEMENTS } from './actionsType';

// types
import { ElementType, T2DCoordinates, TElement, TObject } from 'types';

export type TElementDynamicData = Pick<
  TElement,
  'height' | 'id' | 'positionAbsolute' | 'positionRelative' | 'rotate' | 'width'
>;

export type TElementStaticData = Pick<
  TElement,
  'id' | 'index' | 'parentId' | 'type'
>;

export type TElementsData = {
  dynamicData: TObject<TElementDynamicData>;
  staticData: TObject<TElementStaticData>;
};

export type TSelectedElement = {
  coordinates: T2DCoordinates;
  id: TElement['id'];
  parentId: TElement['parentId'];
  type: ElementType;
};

export type TSelectedElements = TObject<TSelectedElement>;

export type TPageBuilderState = {
  elements: TElementsData;
  isLoading: boolean;
  isPending: boolean;
  selectedElements: TSelectedElements;
};

export type TAddELementActionPayload = Omit<TElement, 'index'>;

export type TAddELementAction = {
  payload: TAddELementActionPayload;
  type: typeof ADD_ELEMENT;
};

export type TSetSelectedElementsAction = {
  payload: TSelectedElements;
  type: typeof SET_SELECTED_ELEMENTS;
};
