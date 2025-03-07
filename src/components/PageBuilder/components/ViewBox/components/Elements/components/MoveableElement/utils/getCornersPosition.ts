// others
import { OUTLINE } from '../constants';

// types
import { TElementDynamicData } from 'store/pageBuilder/types';
import { TRectCoordinates } from 'types';

export const getCornersPosition = (
  height: TElementDynamicData['height'],
  width: TElementDynamicData['width'],
): TRectCoordinates => ({
  x1: (OUTLINE / 2) * -1,
  x2: width + OUTLINE / 2,
  y1: (OUTLINE / 2) * -1,
  y2: height + OUTLINE / 2,
});
