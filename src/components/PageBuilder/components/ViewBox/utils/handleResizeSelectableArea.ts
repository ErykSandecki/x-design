// types
import { MouseButton, T3DCoordinates } from 'types';
import { MouseMode } from '../../../enums';
import { TRectArea } from '../../../types';

// utils
import { mousePoisitionRelative } from 'shared';

export const handleResizeSelectableArea = (
  coordinates: T3DCoordinates,
  event: MouseEvent,
  mouseMode: MouseMode,
  selectableArea: TRectArea,
  setSelectableArea: (selectableArea: TRectArea) => void,
): void => {
  if (
    selectableArea &&
    event.buttons === MouseButton.lmb &&
    mouseMode === MouseMode.default
  ) {
    const { x, y } = mousePoisitionRelative(coordinates, event);
    setSelectableArea({ ...selectableArea, x2: x, y2: y });
  }
};
