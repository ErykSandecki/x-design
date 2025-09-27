// others
import {
  ADD_ELEMENT,
  CHANGE_ALIGNMENT,
  CHANGE_BACKGROUND,
  CHANGE_LAYOUT,
  CHANGE_PARENT,
  CHANGE_POSITION,
  CLEAR_PREV_STATE,
  FIT_LAYOUT,
  FLIP_ELEMENTS,
  REDUCER_HISTORY_REDO,
  REDUCER_HISTORY_SAVE,
  REDUCER_HISTORY_UNDO,
  ROTATE_ELEMENTS,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
  RESIZE_ELEMENT,
  SET_ELEMENTS_COORDINATES,
  UNSELECT_ELEMENT,
  UPDATE_EVENTS_STATUS,
  UPDATE_PREV_STATE,
  SET_ELEMENTS_SIZES,
  APPLY_ELEMENTS_SIZE_TYPE,
} from './actionsType';

// types
import { AnchorResize, AnchorRotate, DropAnchorsPosition } from './enums';
import {
  AlignmentHorizontal,
  AlignmentVertical,
  ElementType,
  KeyboardKeys,
  TAction,
  TBackground,
  TElement,
  TObject,
  TSize,
} from 'types';

export type TElementDynamicData = Pick<
  TElement,
  'alignment' | 'angle' | 'background' | 'coordinates' | 'deepLevel' | 'height' | 'id' | 'layout' | 'position' | 'width'
>;

export type TElementStaticData = Pick<TElement, 'children' | 'id' | 'parentId' | 'type'>;

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
  isRotating: boolean;
  possibleAnchorElementId: TElement['id'];
  possibleAnchorPosition: DropAnchorsPosition;
  possibleIndexPosition: number | null;
  possibleParent: TElement['id'] | null;
  pressedKey: KeyboardKeys;
  selectedAnchorResize: AnchorResize;
  selectedAnchorRotate: AnchorRotate;
};

export type TPositions = {
  allData: TElementsData['allData'];
  dynamicData: TElementsData['dynamicData'];
  selectedElements: TSelectedElements;
};

export type TReducerHistory = Pick<TPage, 'areaCoordinates' | 'elements' | 'selectedElements'>;

export type TSelectedElement = {
  id: TElement['id'];
  parentId: TElement['parentId'];
  position: TElement['position'];
  type: ElementType;
};

export type TSelectedElements = Array<TSelectedElement>;

export type TSizeCoordinates = Pick<TElement, 'coordinates' | 'height' | 'width'>;

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

export type TApplyElementsSizeTypeActionPaylad = {
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  type: 'auto' | 'fixed' | 'max' | 'min' | 'unit';
};

export type TApplyElementsSizeTypeAction = {
  payload: TApplyElementsSizeTypeActionPaylad;
  type: typeof APPLY_ELEMENTS_SIZE_TYPE;
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

export type TChangeLayoutAction = {
  payload: TElement['layout']['type'];
  type: typeof CHANGE_LAYOUT;
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

export type TFitLayoutAction = {
  type: typeof FIT_LAYOUT;
};

export type TFlipElementsAction = {
  payload: keyof T2DCoordinates;
  type: typeof FLIP_ELEMENTS;
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

export type TResizeElementActionPayload = Pick<TElement, 'id'> & {
  baseCoordinates: TRectCoordinates;
  height: TSize['value'];
  mouseCoordinates: T2DCoordinates;
  width: TSize['value'];
};

export type TResizeElementAction = {
  payload: TResizeElementActionPayload;
  type: typeof RESIZE_ELEMENT;
};

export type TRotateElementsAction = {
  payload: TElement['angle'];
  type: typeof ROTATE_ELEMENTS;
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

export type TSetElementsCoordinatesActionPayload = {
  coordinates: T2DCoordinates;
  mode: 'dynamic' | 'static';
};

export type TSetElementsCoordinatesAction = {
  payload: TSetElementsCoordinatesActionPayload;
  type: typeof SET_ELEMENTS_COORDINATES;
};

export type TSetElementsSizesActionPayload = {
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  value: TElement['height']['value'] | TElement['width']['value'];
};

export type TSetElementsSizesAction = {
  payload: TSetElementsSizesActionPayload;
  type: typeof SET_ELEMENTS_SIZES;
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
