import { MouseEvent } from 'react';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { T2DCoordinates, T3DCoordinates } from 'types';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  coordinates: T3DCoordinates,
  setCursorPosition: (cursorPosition: T2DCoordinates) => void,
  setCursorState: (cursorState: string) => void,
): TUseMouseDownEvent => {
  const handleMouseDown = (event: MouseEvent): void => {
    setCursorState(CURSOR_STATES[event.buttons]);
    setCursorPosition({
      x: event.clientX - coordinates.x,
      y: event.clientY - coordinates.y,
    });
  };

  return handleMouseDown;
};
