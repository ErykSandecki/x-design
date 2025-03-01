import { MouseEvent, RefObject } from 'react';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { T2DCoordinates, T3DCoordinates } from 'types';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  coordinates: T3DCoordinates,
  cursorPosition: RefObject<T2DCoordinates>,
  onMouseDown: (event: MouseEvent) => void,
  setCursorState: (cursorState: string) => void,
): TUseMouseDownEvent => {
  const handleMouseDown = (event: MouseEvent): void => {
    onMouseDown(event);
    setCursorState(CURSOR_STATES[event.buttons]);
    cursorPosition.current = {
      x: event.clientX - coordinates.x,
      y: event.clientY - coordinates.y,
    };
  };

  return handleMouseDown;
};
