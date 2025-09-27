import { MouseEvent } from 'react';

// types
import { MouseButton } from 'types';
import { MouseMode } from '../../../../../types/enums/mouseMode';
import { TRectArea } from '../../../../PageBuilder/types';

// utils
import { mousePositionRelative } from 'shared';

export const handleInitElementArea = (
  coordinates: T3DCoordinates,
  event: MouseEvent,
  mouseMode: MouseMode,
  setElementArea: (elementArea: TRectArea) => void,
): void => {
  if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.toolBeltA) {
    const { x, y } = mousePositionRelative(coordinates, event);
    setElementArea({ x1: x, x2: x, y1: y, y2: y });
  }
};
