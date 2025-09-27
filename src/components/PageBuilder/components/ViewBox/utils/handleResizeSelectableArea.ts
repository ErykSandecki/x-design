// types
import { MouseButton } from 'types';
import { MouseMode } from '../../../../../types/enums/mouseMode';
import { TRectAreaExtended } from '../../../types';

// utils
import { distanceHasChanged } from 'utils';
import { mousePositionRelative } from 'shared';

export const handleResizeSelectableArea = (
  coordinates: T3DCoordinates,
  event: MouseEvent,
  mouseMode: MouseMode,
  selectableArea: TRectAreaExtended,
  setSelectableArea: (selectableArea: TRectAreaExtended) => void,
): void => {
  if (selectableArea && event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
    const { x, y } = mousePositionRelative(coordinates, event);
    const { x1, y1 } = selectableArea;
    const visible = selectableArea.visible || distanceHasChanged({ x: x1, y: y1 }, 1, event);

    setSelectableArea({ ...selectableArea, visible, x2: x, y2: y });
  }
};
