import { MouseEvent } from 'react';

// types
import { MouseButton, T2DCoordinates, T3DCoordinates } from 'types';

export type TUseMouseMoveEvent = (event: MouseEvent) => void;

export const useMouseMoveEvent = (
  coordinates: T3DCoordinates,
  cursorPosition: T2DCoordinates,
  setCoordinates: (coordinates: T3DCoordinates) => void,
): TUseMouseMoveEvent => {
  const handleMouseMove = (event: MouseEvent): void => {
    if (event.buttons === MouseButton.rmb) {
      setCoordinates({
        ...coordinates,
        x: event.clientX - cursorPosition.x,
        y: event.clientY - cursorPosition.y,
      });
    }
  };

  return handleMouseMove;
};
