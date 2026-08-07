// types
import { AnchorResize, AnchorRotate, DropAnchorsPosition } from './enums';
import {
  AlignmentHorizontal,
  AlignmentVertical,
  ElementType,
  KeyboardKeys,
  TBackground,
  TChildren,
  TElement,
  TGap,
  TGrid,
  TInsets,
  TInsetsName,
  TNestedKeyOf,
  TObject,
  TValue,
  TValueExtended,
  TValueScore,
  Unit,
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

export type TSizeCoordinates = Pick<TElement, 'coordinates'> & {
  height: Partial<TValue['value']>;
  width: Partial<TValue['value']>;
};

export type TStrictAxis = [] | [keyof T2DCoordinates] | [keyof T2DCoordinates, keyof T2DCoordinates];

export type TPageBuilderState = {
  currentPage: TPage['id'];
  events: TEvents;
  isLoading: boolean;
  isPending: boolean;
  pages: TObject<TPage>;
};

export type TAddELementActionPayload = Omit<TElement, 'index'>;

export type TAddVariantActionPayload = { key: 'background'; value: TBackground };

export type TApplyElementsInsetTypeActionPayload = {
  insets: Array<keyof TInsets>;
  name: TInsetsName;
  type: 'fixed';
};

export type TApplyElementsTypeActionPayload = {
  mode: TValueExtended['mode'];
  properties: Array<TNestedKeyOf<TElement>>;
  unit?: Unit;
};

export type TChangeAlignmentActionPayload = {
  horizontal?: AlignmentHorizontal;
  vertical?: AlignmentVertical;
};

export type TChangeBackgroundActionPayload = Pick<TElement, 'id'> & {
  background: Partial<TBackground>;
  index: number;
};

export type TChangeBackgroundOrderActionPayload = {
  draggableItem: number;
  position: number;
};

export type TChangeLayoutActionPayload = TElement['layout']['type'];

export type TChangeLayoutAlignmentActionPayload = TElement['layout']['alignment'];

export type TChangeLayoutBoxSizingActionPayload = TElement['layout']['boxSizing'];

export type TChangeLayoutGridActionPayload = Partial<TGrid>;

export type TChangePropertiesActionPayload = Partial<TElement>;

export type TFlipElementsActionPayload = keyof T2DCoordinates;

export type TRemoveVariantActionPayload = {
  index: number;
  key: 'background';
};

export type TResizeElementActionPayload = Pick<TElement, 'id'> & {
  baseCoordinates: TRectCoordinates;
  flip: TElement['flip'];
  height: TValue['value'];
  mouseCoordinates: T2DCoordinates;
  width: TValue['value'];
};

export type TRotateElementsActionPayload = TElement['angle'];

export type TSetElementsCoordinatesActionPayload = {
  coordinates: T2DCoordinates;
  mode: 'dynamic' | 'static';
};

export type TSetElementsGapActionPayload = {
  gap: keyof TGap;
  value: TValue['value'];
};

export type TSetElementsScoreToCurrentSizeActionPayload = {
  scoreType: keyof TValueScore;
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
};

export type TSetElementsSizesActionPayload = {
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  value: TValue['value'];
};

export type TSetElementsSizesMinMaxActionPayload = {
  scoreType: keyof TValueScore;
  sizeType: keyof Pick<TElement, 'height' | 'width'>;
  value:
    | TElement['height']['max']['value']
    | TElement['height']['min']['value']
    | TElement['width']['max']['value']
    | TElement['width']['min']['value'];
};
