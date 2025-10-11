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
  const { z } = currentPage.areaCoordinates;
  const { x, y } = getOffsetXY(id, parentId);

  return {
    x: Math.floor(Math.abs(x) / z),
    y: Math.floor(Math.abs(y) / z),
  };
};
