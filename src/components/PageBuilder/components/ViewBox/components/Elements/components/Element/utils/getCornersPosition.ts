// others
import { OUTLINE } from '../constants';

// types
import { TElement } from 'types';

export const getCornersPosition = (
  height: TElement['height']['value'],
  width: TElement['width']['value'],
): TRectCoordinates => ({
  x1: (OUTLINE / 2) * -1,
  x2: (width as number) + OUTLINE / 2,
  y1: (OUTLINE / 2) * -1,
  y2: (height as number) + OUTLINE / 2,
});
