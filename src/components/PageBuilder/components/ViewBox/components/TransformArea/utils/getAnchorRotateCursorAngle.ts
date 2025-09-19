// types
import { AnchorRotate } from 'store/pageBuilder/enums';
import { TElement } from 'types';

export const getAnchorRotateCursorAngle = (
  anchor: AnchorRotate,
  rotate: TElement['rotate'],
) => {
  switch (anchor) {
    case AnchorRotate.northEast:
      return 0 + rotate;
    case AnchorRotate.northWest:
      return -90 + rotate;
    case AnchorRotate.southEast:
      return 90 + rotate;
    default:
      return 180 + rotate;
  }
};
