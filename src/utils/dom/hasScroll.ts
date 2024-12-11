import { MutableRefObject } from 'react';

export const hasScroll = (ref: MutableRefObject<any>, offset = 0): boolean => {
  if (ref.current) {
    const height = parseInt(getComputedStyle(ref.current).height) + offset;

    return height > window.innerHeight;
  }

  return false;
};
