import { MouseEvent } from 'react';

// types
import { MouseButton } from 'types';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (): TUseMouseDownEvent => {
  const handleMouseDown = (event: MouseEvent) => {
    if (event.buttons === MouseButton.lmb) {
      event.stopPropagation();
    }
  };

  return handleMouseDown;
};
