// types
import { AnchorResize } from 'store/pageBuilder/enums';
import { TElement } from 'types';

export const handleFlipAxis = (
  baseFlipAxis: TElement['flip']['x'] | TElement['flip']['y'],
  correctAnchor: AnchorResize,
  currentFlipAxis: TElement['flip']['x'] | TElement['flip']['y'],
  currentAnchor: AnchorResize,
): TElement['flip']['x'] | TElement['flip']['y'] | undefined => {
  switch (true) {
    case correctAnchor === currentAnchor && baseFlipAxis !== currentFlipAxis:
      return baseFlipAxis;
    case correctAnchor !== currentAnchor && baseFlipAxis === currentFlipAxis:
      return !baseFlipAxis;
    default:
      return undefined;
  }
};

export const getFlipAxisToChange = (
  baseFlip: TElement['flip'],
  correctAnchor: AnchorResize,
  currentFlip: TElement['flip'],
  currentAnchor: AnchorResize,
  position: TElement['position'],
): Partial<TElement['flip']> | undefined => {
  if (position === 'absolute') {
    switch (currentAnchor) {
      case AnchorResize.east:
      case AnchorResize.west:
        return {
          x: handleFlipAxis(baseFlip.x, correctAnchor, currentFlip.x, currentAnchor),
        };
      case AnchorResize.north:
      case AnchorResize.south:
        return {
          y: handleFlipAxis(baseFlip.y, correctAnchor, currentFlip.y, currentAnchor),
        };
      default:
        return {
          x: handleFlipAxis(baseFlip.x, correctAnchor, currentFlip.x, currentAnchor),
          y: handleFlipAxis(baseFlip.y, correctAnchor, currentFlip.y, currentAnchor),
        };
    }
  }

  return undefined;
};
