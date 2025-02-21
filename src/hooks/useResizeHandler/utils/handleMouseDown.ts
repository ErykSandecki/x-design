import { MouseEvent } from 'react';

// types
import { MouseButton } from 'types';

export const handleMouseDown = (
  event: MouseEvent<HTMLElement>,
  isInverted: boolean,
  setIsInverted: (isInverted: boolean) => void,
  setIsPressing: (flag: boolean) => void,
): void => {
  if (event.buttons === MouseButton.lmb) {
    setIsInverted(isInverted);
    setIsPressing(true);
  }
};
