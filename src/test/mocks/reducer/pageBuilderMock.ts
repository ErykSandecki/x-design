// others
import { BASE_3D } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// types
import {
  TElementDynamicData,
  TElementStaticData,
  TPageBuilderState,
  TSelectedElement,
} from 'store/pageBuilder/types';
import { ElementType, TElement } from 'types';

export const pageBuilderStateMock: Record<
  typeof PAGE_BUILDER,
  TPageBuilderState
> = {
  [PAGE_BUILDER]: {
    elements: { dynamicData: [], staticData: [] },
    isLoading: true,
    isPending: false,
    selectedElements: [],
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
  parentId: '-1',
  type: ElementType.frame,
};

export const createFrameMock: TElement = {
  height: 0,
  id: '1',
  parentId: '-1',
  positionAbsolute: { x: 0, y: 0 },
  positionRelative: { x: 0, y: 0 },
  rotate: 0,
  type: ElementType.frame,
  width: 0,
};

export const selectedElementMock: TSelectedElement = {
  coordinates: BASE_3D,
  id: '1',
  type: ElementType.frame,
};
