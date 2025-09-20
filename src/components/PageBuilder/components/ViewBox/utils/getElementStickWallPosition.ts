// types
import { ElementStickWallPosition } from '../types/enums';
import { TElement } from 'types';

export const getElementStickWallPosition = (
  rotate: TElement['rotate'],
): ElementStickWallPosition => {
  switch (true) {
    case rotate >= -45 && rotate <= 45:
      return ElementStickWallPosition.top;
    case rotate >= 45 && rotate <= 135:
      return ElementStickWallPosition.left;
    case (rotate >= 135 && rotate <= 180) || (rotate >= -180 && rotate <= -135):
      return ElementStickWallPosition.bottom;
    default:
      return ElementStickWallPosition.right;
  }
};
