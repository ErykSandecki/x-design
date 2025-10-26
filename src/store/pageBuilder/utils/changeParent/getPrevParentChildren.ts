// types
import { TChildren, TElement } from 'types';
import { TEvents } from '../../types';

export const hasChildToExclude = (draggableElements: TEvents['draggableElements'], id: TElement['id']): boolean =>
  draggableElements.some((draggableElement) => draggableElement.id === id);

export const getPrevParentChildren = (
  draggableElements: TEvents['draggableElements'],
  prevParentChildren,
): Array<TChildren> => prevParentChildren.filter(({ id }) => !hasChildToExclude(draggableElements, id));
