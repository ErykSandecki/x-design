// types
import { T2DCoordinates, TElement } from 'types';

export const getOffsetXY = (
  childrenId: TElement['id'],
  parentId: TElement['parentId'],
  reverse?: boolean,
): T2DCoordinates => {
  const { top: parentTop, left: parentLeft } = document
    .getElementById(parentId)
    .getBoundingClientRect();
  const { top: childrenTop, left: childrenLeft } = document
    .getElementById(childrenId)
    .getBoundingClientRect();

  if (reverse) {
    return {
      x: childrenLeft - parentLeft,
      y: childrenTop - parentTop,
    };
  }

  return {
    x: parentLeft - childrenLeft,
    y: parentTop - childrenTop,
  };
};
