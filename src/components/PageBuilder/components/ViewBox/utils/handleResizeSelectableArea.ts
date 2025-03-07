// types
import { MouseButton, T3DCoordinates } from 'types';
import { MouseMode } from '../../../enums';
import { TReactArea } from '../../../types';

// utils
import { mousePoisitionRelative } from 'shared';

export const handleResizeSelectableArea = (
  coordinates: T3DCoordinates,
  event: MouseEvent,
  mouseMode: MouseMode,
  selectableArea: TReactArea,
  setSelectableArea: (selectableArea: TReactArea) => void,
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
