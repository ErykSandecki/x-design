// types
import { AnchorResize } from '../../enums';
import { TElement } from 'types';
import { TSizeCoordinates } from '../../types';

// utils
import { getAbsoluteCoordinates } from './getAbsoluteCoordinates';
import { getCorrectAnchor } from './getCorrectAnchor';
import { getRelativeCoordinates } from './getRelativeCoordinates';

export const getSizesCoordinates = (
  anchor: AnchorResize,
  aspectRatio: TElement['aspectRatio'],
  baseCoordinates: TRectCoordinates,
  baseFlip: TElement['flip'],
  baseHeight: number,
  baseWidth: number,
  mouseCoordinates: T2DCoordinates,
  position: TElement['position'],
): TSizeCoordinates => {
  const correctAnchor = getCorrectAnchor(anchor, baseCoordinates, mouseCoordinates);

  if (position === 'absolute') {
    return getAbsoluteCoordinates(
      anchor,
      aspectRatio,
      baseCoordinates,
      baseHeight,
      baseWidth,
      correctAnchor,
      mouseCoordinates,
    );
  }

  return getRelativeCoordinates(anchor, aspectRatio, baseCoordinates, baseHeight, baseWidth, mouseCoordinates);
};
