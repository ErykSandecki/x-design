// others
import { BASE_3D, BASE_RECT } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// types
import { Anchor } from 'store/pageBuilder/enums';
import {
  TElementDynamicData,
  TElementStaticData,
  TEvents,
  TPageBuilderState,
  TSelectedElement,
} from 'store/pageBuilder/types';
import { ElementType, TElement } from 'types';

export const pageBuilderStateMock: Record<
  typeof PAGE_BUILDER,
  TPageBuilderState
> = {
  [PAGE_BUILDER]: {
    areaCoordinates: BASE_3D,
    elements: { allData: {}, dynamicData: {}, staticData: {} },
    events: { isMultipleMoving: false, selectedAnchor: Anchor.none },
    isLoading: true,
    isPending: false,
    prevState: undefined,
    selectedElements: {},
  },
};

export const elementDynamicDataMock: TElementDynamicData = {
  height: 100,
  id: '1',
  positionAbsolute: {
    x: 0,
    y: 0,
  },
  positionRelative: {
    x: 0,
    y: 0,
  },
  rotate: 0,
  width: 100,
};

export const elementStaticDataMock: TElementStaticData = {
  id: '1',
  index: 0,
  parentId: '-1',
  type: ElementType.frame,
};

export const allDataMock: TElement = {
  ...elementDynamicDataMock,
  ...elementStaticDataMock,
};

export const createFrameMock: TElement = {
  height: 0,
  id: '1',
  index: 0,
  parentId: '-1',
  positionAbsolute: { x: 0, y: 0 },
  positionRelative: { x: 0, y: 0 },
  rotate: 0,
  type: ElementType.frame,
  width: 0,
};

export const eventsMock: TEvents = {
  isMultipleMoving: false,
  selectedAnchor: Anchor.none,
};

export const selectedElementMock: TSelectedElement = {
  coordinates: BASE_RECT,
  id: '1',
  parentId: '-1',
  type: ElementType.frame,
};
