// others
import {
  ADD_ELEMENT,
  APPLY_ELEMENTS_GAP_TYPE,
  APPLY_ELEMENTS_SIZE_TYPE,
  CHANGE_ALIGNMENT,
  CHANGE_BACKGROUND,
  CHANGE_LAYOUT,
  CHANGE_LAYOUT_ALIGNMENT,
  CHANGE_LAYOUT_BOX_SIZING,
  CHANGE_LAYOUT_GRID,
  CHANGE_INSETS,
  CHANGE_PARENT,
  CHANGE_POSITION,
  CLEAR_PREV_STATE,
  FIT_LAYOUT,
  FLIP_ELEMENTS,
  REDUCER_HISTORY_REDO,
  REDUCER_HISTORY_SAVE,
  REDUCER_HISTORY_UNDO,
  RESIZE_ELEMENT,
  ROTATE_ELEMENTS,
  SELECT_ELEMENT,
  SELECT_ELEMENTS,
  SET_AREA_COORDINATES,
  SET_ELEMENTS_COORDINATES,
  SET_ELEMENTS_GAP,
  SET_ELEMENTS_SCORE_TO_CURRENT_SIZE,
  SET_ELEMENTS_SIZES,
  SET_ELEMENTS_SIZES_MIN_MAX,
  TOGGLE_ASPECT_RATIO,
  UNSELECT_ELEMENT,
  UPDATE_EVENTS_STATUS,
  UPDATE_PREV_STATE,
  APPLY_ELEMENTS_INSET_TYPE,
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
  TChildren,
  TElement,
  TGap,
  TGapProperties,
  TGrid,
  TInsets,
  TInsetsName,
  TObject,
  TScore,
  TSize,
} from 'types';

export type TElements = TObject<TElement>;

export type TPossibleElement = Pick<TElement, 'parentId'> & TRectCoordinates;

export type TEvents = {
  canMoveElements: boolean;
  colorSampler: boolean;
  draggableElements: Array<TChildren>;
  hoverOnElement: TElement['id'];
  isGridDropArea: boolean;
  isMultipleMoving: boolean;
  isResizing: boolean;
  isRotating: boolean;
  possibleAnchorElementId: TElement['id'];
  possibleAnchorPosition: DropAnchorsPosition;
  possibleElement: TPossibleElement | undefined;
  possibleIndexPosition: number | null;
  possibleParent: TElement['id'] | null;
  pressedKey: KeyboardKeys;
  selectedAnchorResize: AnchorResize;
  selectedAnchorRotate: AnchorRotate;
};

export type TReducerHistory = Pick<TPage, 'areaCoordinates' | 'elements' | 'selectedElements'>;

export type TSelectedElement = {
  id: TElement['id'];
  parentId: TElement['parentId'];
  position: TElement['position'];
  type: ElementType;
};

export type TSelectedElements = Array<TSelectedElement>;

export type TPage = {
  areaCoordinates: T3DCoordinates;
  elements: TElements;
  id: string;
  name: string;
  prevState: TPage;
  reducerHistory: Array<TReducerHistory>;
  reducerHistoryIndex: number;
  selectedElements: TSelectedElements;
};

export type TSizeCoordinates = Pick<TElement, 'coordinates' | 'height' | 'width'>;

export type TStrictAxis = [] | [keyof T2DCoordinates] | [keyof T2DCoordinates, keyof T2DCoordinates];

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

export type TApplyElementsGapTypeActionPaylad = {
  gap: keyof TGap;
  type: 'fixed';
};

export type TApplyElementsGapTypeAction = {
  payload: TApplyElementsGapTypeActionPaylad;
  type: typeof APPLY_ELEMENTS_GAP_TYPE;
};

export type TApplyElementsInsetTypeActionPaylad = {
  insets: Array<keyof TInsets>;
  name: TInsetsName;
  type: 'fixed';
};

export type TApplyElementsInsetTypeAction = {
  payload: TApplyElementsInsetTypeActionPaylad;
  type: typeof APPLY_ELEMENTS_INSET_TYPE;
};

export type TApplyElementsSizeTypeActionPayload = {
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  type: 'auto' | 'fixed' | 'max' | 'min' | 'unit';
};

export type TApplyElementsSizeTypeAction = {
  payload: TApplyElementsSizeTypeActionPayload;
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

export type TChangeInsetsActionPayload = {
  insets: Partial<TInsets>;
  name: TInsetsName;
};

export type TChangeInsetsAction = {
  payload: TChangeInsetsActionPayload;
  type: typeof CHANGE_INSETS;
};

export type TChangeLayoutAction = {
  payload: TElement['layout']['type'];
  type: typeof CHANGE_LAYOUT;
};

export type TChangeLayoutAlignmentAction = {
  payload: TElement['layout']['alignment'];
  type: typeof CHANGE_LAYOUT_ALIGNMENT;
};

export type TChangeLayoutBoxSizingAction = {
  payload: TElement['layout']['boxSizing'];
  type: typeof CHANGE_LAYOUT_BOX_SIZING;
};

export type TChangeLayoutGridAction = {
  payload: Partial<TGrid>;
  type: typeof CHANGE_LAYOUT_GRID;
};

export type TChangeParentAction = {
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
  flip: TElement['flip'];
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

export type TSetElementsGapActionPayload = {
  gap: keyof TGap;
  value: TGapProperties['value'];
};

export type TSetElementsGapAction = {
  payload: TSetElementsGapActionPayload;
  type: typeof SET_ELEMENTS_GAP;
};

export type TSetElementsScoreToCurrentSizeActionPayload = {
  scoreType: keyof TScore;
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
};

export type TSetElementsScoreToCurrentSizeAction = {
  payload: TSetElementsScoreToCurrentSizeActionPayload;
  type: typeof SET_ELEMENTS_SCORE_TO_CURRENT_SIZE;
};

export type TSetElementsSizesActionPayload = {
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  value: TSize['value'];
};

export type TSetElementsSizesAction = {
  payload: TSetElementsSizesActionPayload;
  type: typeof SET_ELEMENTS_SIZES;
};

export type TSetElementsSizesMinMaxActionPayload = {
  scoreType: keyof TScore;
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  value: TSize['max'] | TSize['min'];
};

export type TSetElementsSizesMinMaxAction = {
  payload: TSetElementsSizesMinMaxActionPayload;
  type: typeof SET_ELEMENTS_SIZES_MIN_MAX;
};

export type TToggleAspectRatioAction = {
  type: typeof TOGGLE_ASPECT_RATIO;
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
