// types
import { TElement } from 'types';

export const getOffsetXY = (childrenId: TElement['id'], parentId: TElement['parentId']): T2DCoordinates => {
  const { top: parentTop, left: parentLeft } = document.getElementById(parentId).getBoundingClientRect();
  const { top: childrenTop, left: childrenLeft } = document.getElementById(childrenId).getBoundingClientRect();

  return {
    x: parentLeft - childrenLeft,
    y: parentTop - childrenTop,
  };
};
