// types
import { ElementStickWallPosition } from '../types/enums';
import { TElement } from 'types';

export const getElementStickWallPosition = (angle: TElement['angle']): ElementStickWallPosition => {
  switch (true) {
    case angle >= -45 && angle <= 45:
      return ElementStickWallPosition.top;
    case angle >= 45 && angle <= 135:
      return ElementStickWallPosition.left;
    case (angle >= 135 && angle <= 180) || (angle >= -180 && angle <= -135):
      return ElementStickWallPosition.bottom;
    default:
      return ElementStickWallPosition.right;
  }
};
