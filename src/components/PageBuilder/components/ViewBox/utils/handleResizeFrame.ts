// types
import { MouseButton, T3DCoordinates, TRectCoordinates } from 'types';
import { MouseMode } from '../../../enums';

// utils
import { mousePoisitionRelative } from 'shared';

export const handleResizeFrame = (
  coordinates: T3DCoordinates,
  event: MouseEvent,
  frameArea: TRectCoordinates,
  mouseMode: MouseMode,
  setFrameArea: (frameArea: TRectCoordinates) => void,
): void => {
  if (
    frameArea &&
    event.buttons === MouseButton.lmb &&
    mouseMode === MouseMode.toolBeltA
  ) {
    const { x, y } = mousePoisitionRelative(coordinates, event);
    setFrameArea({ ...frameArea, x2: x, y2: y });
  }
};
