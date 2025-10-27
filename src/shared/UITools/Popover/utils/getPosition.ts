import { RefObject } from 'react';

// types
import { AlignPopoverHorizontally, AlignPopoverVertically } from '../enums';

export const getTop = (alignVertically: AlignPopoverVertically, itemRect: DOMRect, popoverRect: DOMRect): number => {
  if (alignVertically === AlignPopoverVertically.top) {
    return itemRect.top;
  }

  return itemRect.top + itemRect.height / 2 - popoverRect.height / 2;
};

export const getPosition = (
  alignHorizontally: AlignPopoverHorizontally,
  alignVertically: AlignPopoverVertically,
  refItem: RefObject<HTMLElement>,
  refPopover: RefObject<HTMLElement>,
): Pick<TOffsets, 'left' | 'top'> => {
  if (!refItem.current || !refPopover.current) {
    return { left: 0, top: 0 };
  }

  const isRight = alignHorizontally === AlignPopoverHorizontally.right;
  const itemRect = refItem.current.getBoundingClientRect();
  const popoverRect = refPopover.current.getBoundingClientRect();
  const left = itemRect.left - (isRight ? popoverRect.width : 0);
  const top = getTop(alignVertically, itemRect, popoverRect);

  return { left, top };
};
