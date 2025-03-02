// others
import { ADD_ELEMENT } from './actionsType';

// types
import { TElement } from 'types';

export type TElementDynamicData = Pick<
  TElement,
  'height' | 'id' | 'positionAbsolute' | 'positionRelative' | 'rotate' | 'width'
>;

export type TElementStaticData = Pick<TElement, 'id' | 'parentId' | 'type'>;

export type TElementsData = {
  dynamicData: Array<TElementDynamicData>;
  staticData: Array<TElementStaticData>;
};

export type TPageBuilderState = {
  elements: TElementsData;
  isLoading: boolean;
  isPending: boolean;
};

export type TAddELementAction = {
  payload: TElement;
  type: typeof ADD_ELEMENT;
};
