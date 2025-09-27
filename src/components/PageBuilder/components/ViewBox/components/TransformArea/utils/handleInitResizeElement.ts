import { MouseEvent, RefObject } from 'react';

// types

export const handleInitResizeElement = (cursorPosition: RefObject<T2DCoordinates>, event: MouseEvent): void => {
  cursorPosition.current = {
    x: Math.round(event.clientX),
    y: Math.round(event.clientY),
  };
};
