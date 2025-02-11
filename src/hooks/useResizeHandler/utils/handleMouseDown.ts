import { MouseEvent } from 'react';

export const handleMouseDown = (
  event: MouseEvent<HTMLElement>,
  isInverted: boolean,
  setIsInverted: (isInverted: boolean) => void,
  setIsPressing: (flag: boolean) => void,
): void => {
  if (event.button === 0) {
    setIsInverted(isInverted);
    setIsPressing(true);
  }
};
