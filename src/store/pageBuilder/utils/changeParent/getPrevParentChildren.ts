// types
import { TChildren } from 'types';
import { TEvents } from '../../types';

export const getPrevParentChildren = (
  draggableElements: TEvents['draggableElements'],
  prevParentChildren,
): Array<TChildren> =>
  prevParentChildren.filter(({ id }) => !draggableElements.some((draggableElement) => draggableElement.id === id));
