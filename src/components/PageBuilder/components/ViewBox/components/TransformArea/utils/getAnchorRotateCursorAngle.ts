// types
import { AnchorRotate } from 'store/pageBuilder/enums';
import { TElement } from 'types';

export const getAnchorRotateCursorAngle = (
  anchor: AnchorRotate,
  angle: TElement['angle'],
) => {
  switch (anchor) {
    case AnchorRotate.northEast:
      return 0 + angle;
    case AnchorRotate.northWest:
      return -90 + angle;
    case AnchorRotate.southEast:
      return 90 + angle;
    default:
      return 180 + angle;
  }
};
