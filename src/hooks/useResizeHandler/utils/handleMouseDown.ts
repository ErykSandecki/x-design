import { MouseEvent } from 'react';

// types
import { MouseButton } from 'types';

export const handleMouseDown = (
  event: MouseEvent<HTMLElement>,
  isInverted: boolean,
  setIsInverted: TFunc<[boolean]>,
  setIsPressing: TFunc<[boolean]>,
): void => {
  if (event.buttons === MouseButton.lmb) {
    setIsInverted(isInverted);
    setIsPressing(true);
  }
};
