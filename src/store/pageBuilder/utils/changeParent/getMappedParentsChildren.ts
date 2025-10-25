import { cloneDeep, first } from 'lodash';

// types
import { TElement } from 'types';
import { TElements, TEvents, TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { filterDraggableElements } from './filterDraggableElements';

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
  prevParent: TElement,
): void => {
  const prevParentChildren = filterDraggableElements(draggableElements, prevParent);
  const nextParentChildren = parentHasChanged ? nextParent.children : [...prevParentChildren];

  prevParent.children = prevParentChildren;
  nextParent.children =
    index !== -1
      ? [...nextParentChildren.slice(0, index), ...draggableElements, ...nextParentChildren.slice(index)]
      : nextParent.children;
};

export const getMappedParentsChildren = (parentHasChanged: boolean, state: TPageBuilderState): TElements => {
  const { elements } = state.pages[state.currentPage];
  const { draggableElements, possibleIndexPosition, possibleParent } = state.events;
  const draggableElement = first(draggableElements);
  const prevParent = cloneDeep(elements[elements[draggableElement.id].parentId]);
  const nextParent = cloneDeep(elements[possibleParent]);
  const index = getTargetIndex(nextParent, parentHasChanged, possibleIndexPosition);

  replaceChildrenPosition(draggableElements, nextParent, index, parentHasChanged, prevParent);

  return {
    [prevParent.id]: prevParent,
    [nextParent.id]: nextParent,
  };
};
