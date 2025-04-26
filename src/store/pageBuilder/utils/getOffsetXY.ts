// types
import { T2DCoordinates, TElement } from 'types';

export const getOffsetXY = (
  childrenId: TElement['id'],
  parentId: TElement['parentId'],
): T2DCoordinates => {
  const { top: parentTop, left: parentLeft } = document
    .getElementById(parentId)
    .getBoundingClientRect();
  const { top: childrenTop, left: childrenLeft } = document
    .getElementById(childrenId)
    .getBoundingClientRect();

  return {
    x: parentLeft - childrenLeft,
    y: parentTop - childrenTop,
  };
};

export const getAbsolutePosition = (
  id: TElement['id'],
  parentId: TElement['parentId'],
  z: number,
): T2DCoordinates => {
  const { x, y } = getOffsetXY(id, parentId);
  return { x: Math.abs(x) / z, y: Math.abs(y) / z };
};
