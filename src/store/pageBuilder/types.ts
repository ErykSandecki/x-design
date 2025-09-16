// others
import {
  ADD_ELEMENT,
  CHANGE_ALIGNMENT,
  CHANGE_BACKGROUND,
  CHANGE_PARENT,
  CHANGE_POSITION,
  CLEAR_PREV_STATE,
  REDUCER_HISTORY_REDO,
  REDUCER_HISTORY_SAVE,
  REDUCER_HISTORY_UNDO,
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
import { AnchorResize } from './enums';
import {
  AlignmentHorizontal,
  AlignmentVertical,
  ElementType,
  KeyboardKeys,
  T2DCoordinates,
  T3DCoordinates,
  TAction,
  TBackground,
  TElement,
  TObject,
  TRectCoordinates,
} from 'types';

export type TElementDynamicData = Pick<
  TElement,
  | 'alignment'
  | 'background'
  | 'coordinates'
  | 'deepLevel'
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
  canMoveElements: boolean;
  colorSampler: boolean;
  draggableElements: Array<TElement['id']>;
  hoverOnElement: TElement['id'];
  isMultipleMoving: boolean;
  isResizing: boolean;
  possibleIndexPosition: number | null;
  possibleParent: TElement['id'] | null;
  pressedKey: KeyboardKeys;
  selectedAnchor: AnchorResize;
};

export type TPositions = {
  allData: TElementsData['allData'];
  dynamicData: TElementsData['dynamicData'];
  selectedElements: TSelectedElements;
};

export type TReducerHistory = Pick<
  TPage,
  'areaCoordinates' | 'elements' | 'selectedElements'
>;

export type TSelectedElement = {
  id: TElement['id'];
  parentId: TElement['parentId'];
  position: TElement['position'];
  type: ElementType;
};

export type TSelectedElements = Array<TSelectedElement>;

export type TSizeCoordinates = Pick<
  TElement,
  'coordinates' | 'height' | 'width'
>;

export type TPage = {
  areaCoordinates: T3DCoordinates;
  elements: TElementsData;
  id: string;
  name: string;
  prevState: TPage;
  reducerHistory: Array<TReducerHistory>;
  reducerHistoryIndex: number;
  selectedElements: TSelectedElements;
};

export type TPageBuilderState = {
  currentPage: TPage['id'];
  events: TEvents;
  isLoading: boolean;
  isPending: boolean;
  pages: TObject<TPage>;
};

export type TAddELementActionPayload = Omit<TElement, 'index'>;

export type TAddELementAction = {
  payload: TAddELementActionPayload;
  type: typeof ADD_ELEMENT;
};

export type TChangeAlignmentActionPayload = {
  horizontal?: AlignmentHorizontal;
  vertical?: AlignmentVertical;
};

export type TChangeAlignmentAction = {
  payload: TChangeAlignmentActionPayload;
  type: typeof CHANGE_ALIGNMENT;
};

export type TChangeBackgroundActionPayload = Pick<TElement, 'id'> & {
  background: Partial<TBackground>;
};

export type TChangeBackgroundAction = {
  payload: TChangeBackgroundActionPayload;
  type: typeof CHANGE_BACKGROUND;
};

export type TChangeParentActionPayload = Pick<
  TEvents,
  'draggableElements' | 'possibleIndexPosition' | 'possibleParent'
>;

export type TChangeParentAction = {
  payload: TChangeParentActionPayload;
  type: typeof CHANGE_PARENT;
};

export type TChangePositionAction = {
  type: typeof CHANGE_POSITION;
};

export type TClearPrevStateAction = {
  type: typeof CLEAR_PREV_STATE;
};

export type TReducerHistoryRedoAction = {
  type: typeof REDUCER_HISTORY_REDO;
};

export type TReducerHistorySaveAction = {
  payload: TAction['type'];
  type: typeof REDUCER_HISTORY_SAVE;
};

export type TReducerHistoryUndoAction = {
  type: typeof REDUCER_HISTORY_UNDO;
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

export type TSetElementsCoordinatesActionPayload = {
  coordinates: T2DCoordinates;
  mode: 'dynamic' | 'static';
};

export type TSetElementsCoordinatesAction = {
  payload: TSetElementsCoordinatesActionPayload;
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
