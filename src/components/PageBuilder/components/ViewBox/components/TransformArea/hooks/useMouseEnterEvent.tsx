// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';
import { TUseChangeCursor } from 'hooks';

// utils
import { getAnchorResizeCursorAngle } from '../utils/getAnchorResizeCursorAngle';
import { getAnchorRotateCursorAngle } from '../utils/getAnchorRotateCursorAngle';

export type TUseMouseEnterEvent = {
  onMouseEnterAnchorResize: (anchor: AnchorResize) => void;
  onMouseEnterAnchorRotate: (anchor: AnchorRotate) => void;
};

export const useMouseEnterEvent = (
  cursorAngle: number,
  isPressingResize: TUseChangeCursor['isPressing'],
  isPressingRotate: TUseChangeCursor['isPressing'],
  onMouseEnterResize: TUseChangeCursor['onMouseEnter'],
  onMouseEnterRotate: TUseChangeCursor['onMouseEnter'],
): TUseMouseEnterEvent => {
  const handleMouseEnterAchnorResize = (anchor: AnchorResize): void => {
    if (!isPressingRotate) {
      onMouseEnterResize(getAnchorResizeCursorAngle(anchor, cursorAngle), 0);
    }
  };

  const handleMouseEnterAchnorRotate = (anchor: AnchorRotate): void => {
    if (!isPressingResize) {
      const angle = getAnchorRotateCursorAngle(anchor, cursorAngle);
      onMouseEnterRotate(angle, angle - cursorAngle);
    }
  };

  return {
    onMouseEnterAnchorResize: handleMouseEnterAchnorResize,
    onMouseEnterAnchorRotate: handleMouseEnterAchnorRotate,
  };
};
