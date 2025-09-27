import { RefObject } from 'react';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseButton } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

export const handleMoveArea = (
  coordinates: T3DCoordinates,
  cursorPosition: RefObject<T2DCoordinates>,
  cursorState: string,
  event: MouseEvent,
  mouseMode: MouseMode,
  onUpdateCoordinates: ((coordinates: T3DCoordinates) => void) | null,
  setCoordinates: (coordinates: T3DCoordinates) => void,
): void => {
  const { x, y } = cursorPosition.current;
  const cursor = cursorState as (typeof CURSOR_STATES)[number];

  if (
    (event.buttons === MouseButton.rmb && cursor === 'rmb') ||
    (event.buttons === MouseButton.lmb && mouseMode === MouseMode.move)
  ) {
    const targetCoordinates = {
      ...coordinates,
      x: event.clientX - x,
      y: event.clientY - y,
    };

    onUpdateCoordinates(targetCoordinates);
    setCoordinates(targetCoordinates);
  }
};
