// types
import { LayoutType } from 'types';
import { TEvents } from 'store/pageBuilder/types';

export const getCoordinates = (
  layoutType: LayoutType,
  possibleElement: TEvents['possibleElement'],
): TRectCoordinates => {
  const { x1, x2, y1, y2 } = possibleElement;
  const coordinates = {
    x1: x1 < x2 ? x1 : x2,
    x2: x1 < x2 ? x2 - x1 : x1 - x2,
    y1: y1 < y2 ? y1 : y2,
    y2: y1 < y2 ? y2 - y1 : y1 - y2,
  };

  return layoutType === LayoutType.freeForm ? coordinates : { ...coordinates, x1: 0, y1: 0 };
};
