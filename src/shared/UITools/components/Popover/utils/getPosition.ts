import { RefObject } from 'react';

export const getPosition = (
  refItem: RefObject<HTMLElement>,
  refPopover: RefObject<HTMLElement>,
): Pick<TOffsets, 'left' | 'top'> => {
  if (!refItem.current || !refPopover.current) {
    return { left: 0, top: 0 };
  }

  const itemRect = refItem.current.getBoundingClientRect();
  const popoverRect = refPopover.current.getBoundingClientRect();
  const left = itemRect.left - popoverRect.width;
  const top = itemRect.top + itemRect.height / 2 - popoverRect.height / 2;

  return { left, top };
};
