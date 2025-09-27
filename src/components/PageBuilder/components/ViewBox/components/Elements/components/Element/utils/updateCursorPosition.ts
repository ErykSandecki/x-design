import { RefObject } from 'react';

// types

export const updateCursorPosition = (
  cursorPosition: RefObject<T2DCoordinates>,
  event: MouseEvent | React.MouseEvent,
): void => {
  cursorPosition.current = {
    x: Math.round(event.clientX),
    y: Math.round(event.clientY),
  };
};
