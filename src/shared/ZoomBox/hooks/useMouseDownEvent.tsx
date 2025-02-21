import { MouseEvent } from 'react';

// types
import { T2DCoordinates, T3DCoordinates } from 'types';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  coordinates: T3DCoordinates,
  setCursorPosition: (cursorPosition: T2DCoordinates) => void,
): TUseMouseDownEvent => {
  const handleMouseDown = (event: MouseEvent): void => {
    setCursorPosition({
      x: event.clientX - coordinates.x,
      y: event.clientY - coordinates.y,
    });
  };

  return handleMouseDown;
};
