import { MouseEvent } from 'react';

export const handlePressing = (event: MouseEvent, setIsPressing: TFunc<[boolean]>): void => {
  if (!event.shiftKey) {
    setIsPressing(true);
  }
};
