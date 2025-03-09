import { RefObject } from 'react';

// types
import { T2DCoordinates } from 'types';

export const updateCursorPosition = (
  cursorPosition: RefObject<T2DCoordinates>,
  event: MouseEvent | React.MouseEvent,
  x: number,
  y: number,
  z: number,
): void => {
  cursorPosition.current = {
    x: Math.round(event.clientX - x * z),
    y: Math.round(event.clientY - y * z),
  };
};
