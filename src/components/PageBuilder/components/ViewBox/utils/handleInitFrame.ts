import { MouseEvent } from 'react';

// types
import { MouseButton, T3DCoordinates, TRectCoordinates } from 'types';
import { MouseMode } from '../../../../PageBuilder/enums';

// utils
import { mousePoisitionRelative } from 'shared';

export const handleInitFrame = (
  coordinates: T3DCoordinates,
  event: MouseEvent,
  mouseMode: MouseMode,
  setFrameArea: (frameArea: TRectCoordinates) => void,
): void => {
  if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.toolBeltA) {
    const { x, y } = mousePoisitionRelative(coordinates, event);
    setFrameArea({ x1: x, x2: x, y1: y, y2: y });
  }
};
