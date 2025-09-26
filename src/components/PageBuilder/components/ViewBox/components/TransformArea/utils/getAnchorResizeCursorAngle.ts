// types
import { AnchorResize } from 'store/pageBuilder/enums';
import { TElement } from 'types';

export const getAnchorResizeCursorAngle = (
  anchor: AnchorResize,
  angle: TElement['angle'],
): number => {
  switch (anchor) {
    case AnchorResize.east:
    case AnchorResize.west:
      return 0 + angle;
    case AnchorResize.north:
    case AnchorResize.south:
      return 90 + angle;
    case AnchorResize.northEast:
    case AnchorResize.southWest:
      return -45 + angle;
    default:
      return 45 + angle;
  }
};
