// types
import { TElement } from 'types';
import { TPage } from '../types';

// utils
import { getOffsetXY } from './getOffsetXY';

export const calculateCoordinatesAbsoluteToParent = (
  currentPage: TPage,
  id: TElement['id'],
  parentId: TElement['parentId'],
): T2DCoordinates => {
  const { x, y } = getOffsetXY(id, parentId, currentPage.areaCoordinates.z);

  return {
    x: Math.floor(Math.abs(x)),
    y: Math.floor(Math.abs(y)),
  };
};
