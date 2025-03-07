// types
import { MouseButton, T3DCoordinates, TRectCoordinates } from 'types';
import { MouseMode } from '../../../enums';

// utils
import { mousePoisitionRelative } from 'shared';

export const handleResizeElement = (
  coordinates: T3DCoordinates,
  elementArea: TRectCoordinates,
  event: MouseEvent,
  mouseMode: MouseMode,
  setElementArea: (elementArea: TRectCoordinates) => void,
): void => {
  if (
    elementArea &&
    event.buttons === MouseButton.lmb &&
    mouseMode === MouseMode.toolBeltA
  ) {
    const { x, y } = mousePoisitionRelative(coordinates, event);
    setElementArea({ ...elementArea, x2: x, y2: y });
  }
};
