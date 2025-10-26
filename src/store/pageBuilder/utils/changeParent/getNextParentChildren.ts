// types
import { ElementType, TElement } from 'types';
import { TEvents } from '../../types';

export const getMergedChildren = (
  children: TElement['children'],
  draggableElements: TEvents['draggableElements'],
  excluded: { current: number; total: number },
  index: number,
): TElement['children'] => {
  const mergedChildren = [...children.slice(0, index), ...draggableElements, ...children.slice(index)];
  const beginIndex = index + draggableElements.length;

  return mergedChildren.filter(({ type }, index) => {
    if (index >= beginIndex && type === ElementType.grid && excluded.current++ < excluded.total) {
      return false;
    }

    return true;
  });
};

export const fillingWithExtendChildren = (
  current: number,
  draggableElements: TEvents['draggableElements'],
): TElement['children'] => draggableElements.slice(current);

export const getChildrenWithFillingEmptyCells = (
  children: TElement['children'],
  draggableElements: TEvents['draggableElements'],
  excluded: { current: number; total: number },
): TElement['children'] => [
  ...children.map((child) =>
    child.type === ElementType.grid && excluded.current < excluded.total
      ? draggableElements[excluded.current++]
      : child,
  ),
  ...fillingWithExtendChildren(excluded.current, draggableElements),
];

export const getNextParentChildren = (
  draggableElements: TEvents['draggableElements'],
  index: number,
  nextParentChildren: TElement['children'],
  possibleAnchorPosition: TEvents['possibleAnchorPosition'],
): TElement['children'] => {
  const excluded = { current: 0, total: draggableElements.length };

  if (index < nextParentChildren.length || possibleAnchorPosition) {
    return getMergedChildren(nextParentChildren, draggableElements, excluded, index);
  }

  return getChildrenWithFillingEmptyCells(nextParentChildren, draggableElements, excluded);
};
