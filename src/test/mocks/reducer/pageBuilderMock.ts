// others
import { BASE_3D, BASE_RECT } from 'shared';
import { BASE_PAGE, BASE_PAGE_ELEMENTS } from 'store/pageBuilder/constants';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// types
import {
  AlignmentLayout,
  AlignmentHorizontal,
  AlignmentVertical,
  ElementType,
  KeyboardKeys,
  LayoutType,
  TAlignment,
  TChildren,
  TElement,
  TFlip,
  TLayout,
  TGapProperties,
  TPadding,
} from 'types';
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';
import {
  TEvents,
  TPageBuilderState,
  TPossibleElement,
  TReducerHistory,
  TSelectedElement,
} from 'store/pageBuilder/types';

export const pageBuilderStateMock: Record<typeof PAGE_BUILDER, TPageBuilderState> = {
  [PAGE_BUILDER]: {
    currentPage: '0',
    events: {
      canMoveElements: true,
      colorSampler: false,
      draggableElements: [],
      hoverOnElement: '-1',
      isGridDropArea: false,
      isMultipleMoving: false,
      isResizing: false,
      isRotating: false,
      possibleAnchorElementId: null,
      possibleAnchorPosition: null,
      possibleElement: undefined,
      possibleIndexPosition: null,
      possibleParent: null,
      pressedKey: KeyboardKeys.none,
      selectedAnchorResize: AnchorResize.none,
      selectedAnchorRotate: AnchorRotate.none,
    },
    isLoading: true,
    isPending: false,
    pages: {
      [BASE_PAGE.id]: BASE_PAGE,
    },
  },
};

export const alignmetnMock: TAlignment = {
  horizontal: AlignmentHorizontal.center,
  vertical: AlignmentVertical.center,
};

export const gapMock: TGapProperties = {
  value: 0,
};

export const layoutMock: TLayout = {
  alignment: AlignmentLayout.none,
  boxSizing: 'excluded',
  gap: { column: gapMock, row: gapMock },
  grid: { columns: 1, rows: 1 },
  type: LayoutType.freeForm,
};

export const flipMock: TFlip = {
  x: false,
  y: false,
};

export const elementMock: TElement = {
  alignment: {},
  angle: 0,
  aspectRatio: false,
  background: {
    properties: { alpha: '100', color: '#ffffff', format: 'hex' },
    visible: true,
  },
  children: [],
  coordinates: {
    x: 0,
    y: 0,
  },
  deepLevel: 0,
  flip: flipMock,
  height: {
    value: 100,
  },
  id: 'test-1',
  layout: layoutMock,
  padding: { b: 0, l: 0, r: 0, t: 0 },
  parentId: '-1',
  position: 'absolute',
  type: ElementType.frame,
  width: {
    value: 100,
  },
};

export const createFrameMock: TElement = {
  alignment: {},
  angle: 0,
  aspectRatio: false,
  background: {
    properties: { alpha: '100', color: '#ffffff', format: 'hex' },
    visible: true,
  },
  children: [],
  coordinates: { x: 0, y: 0 },
  deepLevel: 1,
  flip: flipMock,
  height: {
    value: 0,
  },
  id: 'test-1',
  layout: layoutMock,
  padding: { b: 0, l: 0, r: 0, t: 0 },
  parentId: '-1',
  position: 'absolute',
  type: ElementType.frame,
  width: {
    value: 0,
  },
};

export const eventsMock: TEvents = {
  canMoveElements: true,
  colorSampler: false,
  draggableElements: [],
  hoverOnElement: '-1',
  isGridDropArea: false,
  isMultipleMoving: false,
  isResizing: false,
  isRotating: false,
  possibleAnchorElementId: null,
  possibleAnchorPosition: null,
  possibleElement: undefined,
  possibleIndexPosition: null,
  possibleParent: null,
  pressedKey: KeyboardKeys.none,
  selectedAnchorResize: AnchorResize.none,
  selectedAnchorRotate: AnchorRotate.none,
};

export const possibleElementMock: TPossibleElement = {
  ...BASE_RECT,
  parentId: '-1',
};

export const reducerHistoryMock: Array<TReducerHistory> = [
  {
    areaCoordinates: BASE_3D,
    elements: BASE_PAGE_ELEMENTS,
    selectedElements: [],
  },
  {
    areaCoordinates: BASE_3D,
    elements: {
      ...BASE_PAGE_ELEMENTS,
      ['test-1']: elementMock,
      ['test-2']: {
        ...elementMock,
        id: 'test-2',
      },
    },
    selectedElements: [],
  },
];

export const childrenMock: TChildren = {
  id: 'test-1',
  type: ElementType.frame,
};

export const paddingMock: TPadding = {
  b: 0,
  l: 0,
  r: 0,
  t: 0,
};

export const selectedElementMock: TSelectedElement = {
  id: 'test-1',
  parentId: '-1',
  position: 'absolute',
  type: ElementType.frame,
};
