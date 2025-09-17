import { RefObject } from 'react';

// types
import { T2DCoordinates } from 'types';

export const updateCursorPosition = (
  cursorPosition: RefObject<T2DCoordinates>,
  event: MouseEvent | React.MouseEvent,
): void => {
  cursorPosition.current = {
    x: Math.round(event.clientX),
    y: Math.round(event.clientY),
  };
};
