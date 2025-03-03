// others
import { ADD_ELEMENT, SET_SELECTED_ELEMENTS } from './actionsType';

// types
import { ElementType, T3DCoordinates, TElement } from 'types';

export type TElementDynamicData = Pick<
  TElement,
  'height' | 'id' | 'positionAbsolute' | 'positionRelative' | 'rotate' | 'width'
>;

export type TElementStaticData = Pick<TElement, 'id' | 'parentId' | 'type'>;

export type TElementsData = {
  dynamicData: Array<TElementDynamicData>;
  staticData: Array<TElementStaticData>;
};

export type TSelectedElement = {
  coordinates: T3DCoordinates;
  id: string;
  type: ElementType;
};

export type TSelectedElements = Array<TSelectedElement>;

export type TPageBuilderState = {
  elements: TElementsData;
  isLoading: boolean;
  isPending: boolean;
  selectedElements: TSelectedElements;
};

export type TAddELementAction = {
  payload: TElement;
  type: typeof ADD_ELEMENT;
};

export type TSetSelectedElementsAction = {
  payload: TSelectedElements;
  type: typeof SET_SELECTED_ELEMENTS;
};
