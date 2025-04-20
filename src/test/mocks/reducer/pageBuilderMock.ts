// others
import { BASE_PAGE } from 'store/pageBuilder/constants';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// types
import { Anchor } from 'store/pageBuilder/enums';
import { ElementType, KeyboardKeys, TElement } from 'types';
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
    currentPage: '0',
    events: {
      canMoveElements: true,
      draggableElements: [],
      hoverOnElement: '-1',
      isMultipleMoving: false,
      possibleIndexPosition: null,
      possibleParent: null,
      pressedKey: KeyboardKeys.none,
      selectedAnchor: Anchor.none,
    },
    isLoading: true,
    isPending: false,
    pages: {
      [BASE_PAGE.id]: BASE_PAGE,
    },
  },
};

export const elementDynamicDataMock: TElementDynamicData = {
  background: { alpha: '100', format: 'hex', value: '#ffffff', visible: true },
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
  background: { alpha: '100', format: 'hex', value: '#ffffff', visible: true },
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
  canMoveElements: true,
  draggableElements: [],
  hoverOnElement: '-1',
  isMultipleMoving: false,
  possibleIndexPosition: null,
  possibleParent: null,
  pressedKey: KeyboardKeys.none,
  selectedAnchor: Anchor.none,
};

export const selectedElementMock: TSelectedElement = {
  id: '1',
  parentId: '-1',
  type: ElementType.frame,
};
