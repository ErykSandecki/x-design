import { RefObject } from 'react';

// types
import { T2DCoordinates, T3DCoordinates, TElement } from 'types';

export const updateCursorPositionByElementPosition = (
  cursorPosition: RefObject<T2DCoordinates>,
  elementPosition: TElement['positionAbsolute'],
  event: MouseEvent | React.MouseEvent,
  z: T3DCoordinates['z'],
): void => {
  cursorPosition.current = {
    x: Math.round(event.clientX - elementPosition.x * z),
    y: Math.round(event.clientY - elementPosition.y * z),
  };
};
