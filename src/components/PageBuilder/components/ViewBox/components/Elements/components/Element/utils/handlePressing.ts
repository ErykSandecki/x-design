import { MouseEvent } from 'react';

export const handlePressing = (
  event: MouseEvent,
  setIsPressing: (isPressing: boolean) => void,
): void => {
  if (!event.shiftKey) {
    setIsPressing(true);
  }
};
