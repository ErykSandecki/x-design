// types
import { T2DCoordinates, TElement } from 'types';

// utils
import { getOffsetXY } from './getOffsetXY';

export const getAbsolutePosition = (
  id: TElement['id'],
  parentId: TElement['parentId'],
  z: number,
): T2DCoordinates => {
  const { x, y } = getOffsetXY(id, parentId);
  return { x: Math.abs(x) / z, y: Math.abs(y) / z };
};
