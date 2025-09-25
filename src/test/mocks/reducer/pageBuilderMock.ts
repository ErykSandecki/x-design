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
  LayoutType,
  TAlignment,
  TElement,
  TLayout,
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
      possibleAnchorElementId: null,
      possibleAnchorPosition: null,
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

export const layoutMock: TLayout = {
  type: LayoutType.default,
};

export const elementDynamicDataMock: TElementDynamicData = {
  alignment: {},
  angle: 0,
  background: {
    properties: { alpha: '100', color: '#ffffff', format: 'hex' },
    visible: true,
  },
  coordinates: {
    x: 0,
    y: 0,
  },
  deepLevel: 0,
  height: {
    value: 100,
  },
  id: '1',
  layout: layoutMock,
  position: 'absolute',
  width: {
    value: 100,
  },
};

export const elementStaticDataMock: TElementStaticData = {
  children: [],
  id: '1',
  parentId: '-1',
  type: ElementType.frame,
};

export const elementAllDataMock: TElement = {
  ...elementDynamicDataMock,
  ...elementStaticDataMock,
};

export const createFrameMock: TElement = {
  alignment: {},
  angle: 0,
  background: {
    properties: { alpha: '100', color: '#ffffff', format: 'hex' },
    visible: true,
  },
  children: [],
  coordinates: { x: 0, y: 0 },
  deepLevel: 0,
  height: {
    value: 0,
  },
  id: '1',
  layout: layoutMock,
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
  isMultipleMoving: false,
  isResizing: false,
  isRotating: false,
  possibleAnchorElementId: null,
  possibleAnchorPosition: null,
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
      angle: 0,
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
      height: {
        value: 0,
      },
      id: '-1',
      layout: layoutMock,
      parentId: '-1',
      position: 'absolute',
      type: ElementType.base,
      width: {
        value: 0,
      },
    },
    1: {
      alignment: {},
      angle: 0,
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
      height: {
        value: 500,
      },
      id: '1',
      layout: layoutMock,
      parentId: '-1',
      position: 'absolute',
      type: ElementType.frame,
      width: {
        value: 500,
      },
    },
  },
  dynamicData: {
    '-1': {
      alignment: {},
      angle: 0,
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
      height: {
        value: 0,
      },
      id: '-1',
      layout: layoutMock,
      position: 'absolute',
      width: {
        value: 0,
      },
    },
    1: {
      alignment: {},
      angle: 0,
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
      height: {
        value: 500,
      },
      id: '1',
      layout: layoutMock,
      position: 'absolute',
      width: {
        value: 500,
      },
    },
  },
  staticData: {
    '-1': {
      children: ['1'],
      id: '-1',
      parentId: '-1',
      type: ElementType.base,
    },
    1: {
      children: [],
      id: '1',
      parentId: '-1',
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
