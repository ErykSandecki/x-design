import { cloneDeep, first } from 'lodash';

// types
import { TElement } from 'types';
import { TElements, TEvents, TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { getPrevParentChildren } from './getPrevParentChildren';
import { extendNextParentChildrenAfterGridChanged } from './extendNextParentChildrenAfterGridChanges';
import { extendNextParentGrid } from './extendNextParentGrid';

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
  isGridDropArea: TEvents['isGridDropArea'],
  nextParent: TElement,
  index: number,
  parentHasChanged: boolean,
  prevParent: TElement,
): void => {
  const prevParentChildren = getPrevParentChildren(draggableElements, prevParent);
  const nextParentChildren = parentHasChanged ? nextParent.children : cloneDeep(prevParent.children);

  prevParent.children = prevParentChildren;
  nextParent.children =
    index !== -1
      ? [...nextParentChildren.slice(0, index), ...draggableElements, ...nextParentChildren.slice(index)]
      : nextParent.children;
};

export const getMappedParentsChildren = (
  parentHasChanged: boolean,
  possibleAnchorPosition: TEvents['possibleAnchorPosition'],
  state: TPageBuilderState,
): TElements => {
  const { elements } = state.pages[state.currentPage];
  const { draggableElements, isGridDropArea, possibleIndexPosition, possibleParent } = state.events;
  const draggableElement = first(draggableElements);
  const prevParent = cloneDeep(elements[elements[draggableElement.id].parentId]);
  const nextParent = cloneDeep(elements[possibleParent]);
  const index = getTargetIndex(nextParent, parentHasChanged, possibleIndexPosition);

  replaceChildrenPosition(draggableElements, isGridDropArea, nextParent, index, parentHasChanged, prevParent);
  extendNextParentGrid(draggableElements, nextParent, possibleAnchorPosition);
  extendNextParentChildrenAfterGridChanged(nextParent);

  return {
    [prevParent.id]: prevParent,
    [nextParent.id]: nextParent,
  };
};
