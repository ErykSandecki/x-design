import { MouseEvent, RefObject } from 'react';

// types
import { T2DCoordinates } from 'types';

export const handleInitResizeElement = (
  cursorPosition: RefObject<T2DCoordinates>,
  event: MouseEvent,
): void => {
  cursorPosition.current = {
    x: Math.round(event.clientX),
    y: Math.round(event.clientY),
  };
};
