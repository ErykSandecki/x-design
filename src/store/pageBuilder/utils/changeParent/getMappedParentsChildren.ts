import { cloneDeep, first } from 'lodash';

// types
import { TElement } from 'types';
import { TElements, TEvents, TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { extendChildrenAfterGridChanged } from '../extendChildrenAfterGridChanged';
import { extendGrid } from '../extendGrid';
import { getNextParentChildren } from './getNextParentChildren';
import { getPrevParentChildren } from './getPrevParentChildren';

export const getTargetIndex = (
  nextParent: TElement,
  parentHasChanged: boolean,
  possibleIndexPosition: TEvents['possibleIndexPosition'],
): number => {
  const hasTargetIndex = possibleIndexPosition !== null;

  if (parentHasChanged) {
    return hasTargetIndex ? possibleIndexPosition : nextParent.children.length;
  }

  return hasTargetIndex ? possibleIndexPosition : -1;
};

export const replaceChildrenPosition = (
  draggableElements: TEvents['draggableElements'],
  nextParent: TElement,
  index: number,
  parentHasChanged: boolean,
  possibleAnchorPosition: TEvents['possibleAnchorPosition'],
  prevParent: TElement,
): void => {
  const prevParentChildren = getPrevParentChildren(draggableElements, prevParent);
  const nextParentChildren = parentHasChanged ? nextParent.children : [...prevParentChildren];

  prevParent.children = prevParentChildren;
  nextParent.children = getNextParentChildren(draggableElements, index, nextParentChildren, possibleAnchorPosition);
};

export const getMappedParentsChildren = (
  parentHasChanged: boolean,
  possibleAnchorPosition: TEvents['possibleAnchorPosition'],
  state: TPageBuilderState,
): TElements => {
  const { elements } = state.pages[state.currentPage];
  const { draggableElements, possibleIndexPosition, possibleParent } = state.events;
  const draggableElement = first(draggableElements);
  const prevParent = cloneDeep(elements[elements[draggableElement.id].parentId]);
  const nextParent = cloneDeep(elements[possibleParent]);
  const index = getTargetIndex(nextParent, parentHasChanged, possibleIndexPosition);

  if (index !== -1) {
    replaceChildrenPosition(draggableElements, nextParent, index, parentHasChanged, possibleAnchorPosition, prevParent);
    extendGrid(nextParent, possibleAnchorPosition);
    extendChildrenAfterGridChanged(nextParent);
  }

  return {
    [prevParent.id]: prevParent,
    [nextParent.id]: nextParent,
  };
};
