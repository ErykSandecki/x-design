// types
import { AnchorResize } from 'store/pageBuilder/enums';
import { TElement } from 'types';

export const getAnchorResizeCursorAngle = (
  anchor: AnchorResize,
  rotate: TElement['rotate'],
) => {
  switch (anchor) {
    case AnchorResize.east:
    case AnchorResize.west:
      return 0 + rotate;
    case AnchorResize.north:
    case AnchorResize.south:
      return 90 + rotate;
    case AnchorResize.northEast:
    case AnchorResize.southWest:
      return -45 + rotate;
    default:
      return 45 + rotate;
  }
};
