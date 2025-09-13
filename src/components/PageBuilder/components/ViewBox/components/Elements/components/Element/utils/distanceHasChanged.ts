import { RefObject } from 'react';

// types
import { T2DCoordinates } from 'types';

export const distanceHasChanged = (
  event: MouseEvent,
  cursorPosition: RefObject<T2DCoordinates>,
): boolean => {
  const dx = event.clientX - cursorPosition.current.x;
  const dy = event.clientY - cursorPosition.current.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return distance > 5;
};
