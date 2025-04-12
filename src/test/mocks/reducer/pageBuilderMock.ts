// others
import { BASE_3D, BASE_RECT } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// types
import { Anchor } from 'store/pageBuilder/enums';
import { ElementType, TElement } from 'types';
import {
  TElementDynamicData,
  TElementStaticData,
  TEvents,
  TPageBuilderState,
  TSelectedElement,
} from 'store/pageBuilder/types';

export const pageBuilderStateMock: Record<
  typeof PAGE_BUILDER,
  TPageBuilderState
> = {
  [PAGE_BUILDER]: {
    areaCoordinates: BASE_3D,
    elements: { allData: {}, dynamicData: {}, staticData: {} },
    events: {
      draggableElements: [],
      hoverOnElement: '-1',
      isMultipleMoving: false,
      possibleIndexPosition: null,
      possibleParent: null,
      selectedAnchor: Anchor.none,
    },
    isLoading: true,
    isPending: false,
    prevState: undefined,
    selectedElements: [],
  },
};

export const elementDynamicDataMock: TElementDynamicData = {
  backgroundColor: '#ffffff',
  coordinates: {
    x: 0,
    y: 0,
  },
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
  backgroundColor: '#ffffff',
  children: [],
  coordinates: { x: 0, y: 0 },
  height: 0,
  id: '1',
  parentId: '-1',
  position: 'absolute',
  rotate: 0,
  type: ElementType.frame,
  width: 0,
};

export const eventsMock: TEvents = {
  draggableElements: [],
  hoverOnElement: '-1',
  isMultipleMoving: false,
  possibleIndexPosition: null,
  possibleParent: null,
  selectedAnchor: Anchor.none,
};

export const selectedElementMock: TSelectedElement = {
  coordinates: BASE_RECT,
  id: '1',
  parentId: '-1',
  type: ElementType.frame,
};
