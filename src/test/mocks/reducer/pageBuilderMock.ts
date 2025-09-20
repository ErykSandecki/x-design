// others
import { BASE_3D } from 'shared';
import { BASE_PAGE, BASE_PAGE_ELEMENTS } from 'store/pageBuilder/constants';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';
import {
  AlignmentHorizontal,
  AlignmentVertical,
  ElementType,
  KeyboardKeys,
  TAlignment,
  TElement,
} from 'types';
import {
  TElementDynamicData,
  TElementsData,
  TElementStaticData,
  TEvents,
  TPageBuilderState,
  TReducerHistory,
  TSelectedElement,
} from 'store/pageBuilder/types';

export const pageBuilderStateMock: Record<
  typeof PAGE_BUILDER,
  TPageBuilderState
> = {
  [PAGE_BUILDER]: {
    currentPage: '0',
    events: {
      canMoveElements: true,
      colorSampler: false,
      draggableElements: [],
      hoverOnElement: '-1',
      isMultipleMoving: false,
      isResizing: false,
      isRotating: false,
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

export const elementDynamicDataMock: TElementDynamicData = {
  alignment: {},
  background: {
    properties: { alpha: '100', color: '#ffffff', format: 'hex' },
    visible: true,
  },
  coordinates: {
    x: 0,
    y: 0,
  },
  deepLevel: 0,
  height: 100,
  id: '1',
  position: 'absolute',
  rotate: 0,
  width: 100,
};

export const elementStaticDataMock: TElementStaticData = {
  children: [],
  id: '1',
  parentId: '-1',
  position: 'absolute',
  type: ElementType.frame,
};

export const elementAllDataMock: TElement = {
  ...elementDynamicDataMock,
  ...elementStaticDataMock,
};

export const createFrameMock: TElement = {
  alignment: {},
  background: {
    properties: { alpha: '100', color: '#ffffff', format: 'hex' },
    visible: true,
  },
  children: [],
  coordinates: { x: 0, y: 0 },
  deepLevel: 0,
  height: 0,
  id: '1',
  parentId: '-1',
  position: 'absolute',
  rotate: 0,
  type: ElementType.frame,
  width: 0,
};

export const eventsMock: TEvents = {
  canMoveElements: true,
  colorSampler: false,
  draggableElements: [],
  hoverOnElement: '-1',
  isMultipleMoving: false,
  isResizing: false,
  isRotating: false,
  possibleIndexPosition: null,
  possibleParent: null,
  pressedKey: KeyboardKeys.none,
  selectedAnchorResize: AnchorResize.none,
  selectedAnchorRotate: AnchorRotate.none,
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
      allData: {
        ...BASE_PAGE_ELEMENTS.allData,
        ['1']: elementAllDataMock,
        ['2']: {
          ...elementAllDataMock,
          id: '2',
        },
      },
      dynamicData: {
        ...BASE_PAGE_ELEMENTS.dynamicData,
        ['1']: elementDynamicDataMock,
        ['2']: {
          ...elementDynamicDataMock,
          id: '2',
        },
      },
      staticData: {
        ...BASE_PAGE_ELEMENTS.staticData,
        ['1']: elementStaticDataMock,
        ['2']: {
          ...elementStaticDataMock,
          id: '2',
        },
      },
    },
    selectedElements: [],
  },
];

export const selectedElementMock: TSelectedElement = {
  id: '1',
  parentId: '-1',
  position: 'absolute',
  type: ElementType.frame,
};

export const oneElementMock: TElementsData = {
  allData: {
    '-1': {
      alignment: {},
      background: {
        properties: {
          alpha: '100',
          color: '#1e262f',
          format: 'hex',
        },
        visible: true,
      },
      children: ['1'],
      coordinates: {
        x: 0,
        y: 0,
      },
      deepLevel: 0,
      height: 0,
      id: '-1',
      parentId: '-1',
      position: 'absolute',
      rotate: 0,
      type: ElementType.base,
      width: 0,
    },
    1: {
      alignment: {},
      background: {
        properties: {
          alpha: '100',
          color: '#ffffff',
          format: 'hex',
        },
        visible: true,
      },
      children: [],
      coordinates: {
        x: 500,
        y: 500,
      },
      deepLevel: 0,
      height: 500,
      id: '1',
      parentId: '-1',
      position: 'absolute',
      rotate: 0,
      type: ElementType.frame,
      width: 500,
    },
  },
  dynamicData: {
    '-1': {
      alignment: {},
      background: {
        properties: {
          alpha: '100',
          color: '#1e262f',
          format: 'hex',
        },
        visible: true,
      },
      coordinates: {
        x: 0,
        y: 0,
      },
      deepLevel: 0,
      height: 0,
      id: '-1',
      position: 'absolute',
      rotate: 0,
      width: 0,
    },
    1: {
      alignment: {},
      background: {
        properties: {
          alpha: '100',
          color: '#ffffff',
          format: 'hex',
        },
        visible: true,
      },
      coordinates: {
        x: 500,
        y: 500,
      },
      deepLevel: 0,
      height: 500,
      id: '1',
      position: 'absolute',
      rotate: 0,
      width: 500,
    },
  },
  staticData: {
    '-1': {
      children: ['1'],
      id: '-1',
      parentId: '-1',
      position: 'absolute',
      type: ElementType.base,
    },
    1: {
      children: [],
      id: '1',
      parentId: '-1',
      position: 'absolute',
      type: ElementType.frame,
    },
  },
};

export const oneElementSelectedMock: TSelectedElement = {
  id: oneElementMock.allData['1'].id,
  parentId: oneElementMock.allData['1'].parentId,
  position: oneElementMock.allData['1'].position,
  type: oneElementMock.allData['1'].type,
};
