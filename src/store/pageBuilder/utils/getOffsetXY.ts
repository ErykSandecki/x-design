// types
import { TElement } from 'types';

// utils
import { getOriginElementBounding } from 'utils';

export const getOffsetXY = (
  childrenId: TElement['id'],
  parentId: TElement['parentId'],
  z: T3DCoordinates['z'],
): T2DCoordinates => {
  const { top: parentTop, left: parentLeft } = getOriginElementBounding(document.getElementById(parentId), z);
  const { top: childrenTop, left: childrenLeft } = getOriginElementBounding(document.getElementById(childrenId), z);

  return {
    x: parentLeft - childrenLeft,
    y: parentTop - childrenTop,
  };
};
