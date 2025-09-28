// types
import { TUseChangeCursor } from 'hooks';

export type TUseMouseLeaveEvent = {
  onMouseLeaveAnchorResize: TFunc;
  onMouseLeaveAnchorRotate: TFunc;
};

export const useMouseLeaveEvent = (
  isPressingResize: TUseChangeCursor['isPressing'],
  isPressingRotate: TUseChangeCursor['isPressing'],
  onMouseLeaveResize: TUseChangeCursor['onMouseLeave'],
  onMouseLeaveRotate: TUseChangeCursor['onMouseLeave'],
): TUseMouseLeaveEvent => {
  const handleMouseLeaveAchnorResize = (): void => {
    if (!isPressingRotate) {
      onMouseLeaveResize();
    }
  };

  const handleMouseLeaveAchnorRotate = (): void => {
    if (!isPressingResize) {
      onMouseLeaveRotate();
    }
  };

  return {
    onMouseLeaveAnchorResize: handleMouseLeaveAchnorResize,
    onMouseLeaveAnchorRotate: handleMouseLeaveAchnorRotate,
  };
};
