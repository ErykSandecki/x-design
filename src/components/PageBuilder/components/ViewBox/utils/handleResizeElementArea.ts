// types
import { MouseButton, T3DCoordinates } from 'types';
import { MouseMode } from '../../../enums';
import { TReactArea } from '../../../../PageBuilder/types';

// utils
import { mousePoisitionRelative } from 'shared';

export const handleResizeElementArea = (
  coordinates: T3DCoordinates,
  elementArea: TReactArea,
  event: MouseEvent,
  mouseMode: MouseMode,
  setElementArea: (elementArea: TReactArea) => void,
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
