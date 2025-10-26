// types
import { ElementType, LayoutType, TChildren, TElement } from 'types';
import { TEvents } from '../../types';

export const hasChildToExclude = (draggableElements: TEvents['draggableElements'], id: TElement['id']): boolean =>
  draggableElements.some((draggableElement) => draggableElement.id === id);

export const getPrevParentChildren = (
  draggableElements: TEvents['draggableElements'],
  prevParent: TElement,
): Array<TChildren> =>
  prevParent.layout.type === LayoutType.grid
    ? prevParent.children.map((child) =>
        hasChildToExclude(draggableElements, child.id) ? { id: 'unknown', type: ElementType.grid } : child,
      )
    : prevParent.children.filter(({ id }) => !hasChildToExclude(draggableElements, id));
