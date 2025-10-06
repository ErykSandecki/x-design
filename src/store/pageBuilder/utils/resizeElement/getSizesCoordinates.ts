// types
import { AnchorResize } from '../../enums';
import { TElement } from 'types';
import { TSizeCoordinates } from '../../types';

// utils
import { getAbsoluteCoordinates } from './getAbsoluteCoordinates';
import { getRelativeCoordinates } from './getRelativeCoordinates';

export const getSizesCoordinates = (
  anchor: AnchorResize,
  aspectRatio: TElement['aspectRatio'],
  baseCoordinates: TRectCoordinates,
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
  position: TElement['position'],
): TSizeCoordinates => {
  if (position === 'absolute') {
    return getAbsoluteCoordinates(anchor, aspectRatio, baseCoordinates, baseHeight, baseWidth, mouseCoordinates);
  }

  return getRelativeCoordinates(anchor, aspectRatio, baseCoordinates, baseHeight, baseWidth, mouseCoordinates);
};
