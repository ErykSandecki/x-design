// types
import { Anchor } from '../../enums';
import { T2DCoordinates, TElement, TRectCoordinates } from 'types';
import { TSizeCoordinates } from '../../types';

// utils
import { getAbsoluteCoordinates } from './getAbsoluteCoordinates';
import { getRelativeCoordinates } from './getRelativeCoordinates';

export const getSizesCoordinates = (
  anchor: Anchor,
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
  position: TElement['position'],
): TSizeCoordinates => {
  if (position === 'absolute') {
    return getAbsoluteCoordinates(
      anchor,
      baseCoordinates,
      baseHeight,
      baseWidth,
      mouseCoordinates,
    );
  }

  return getRelativeCoordinates(
    anchor,
    baseCoordinates,
    baseHeight,
    baseWidth,
    mouseCoordinates,
  );
};
