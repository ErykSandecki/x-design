import { MouseEvent } from 'react';

// types
import { MouseButton, T3DCoordinates } from 'types';
import { MouseMode } from '../../../enums';
import { TReactArea } from '../../../../PageBuilder/types';

// utils
import { mousePoisitionRelative } from 'shared';

export const handleInitElementArea = (
  coordinates: T3DCoordinates,
  event: MouseEvent,
  mouseMode: MouseMode,
  setElementArea: (elementArea: TReactArea) => void,
): void => {
  if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.toolBeltA) {
    const { x, y } = mousePoisitionRelative(coordinates, event);
    setElementArea({ x1: x, x2: x, y1: y, y2: y });
  }
};
