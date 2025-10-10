// types
import { MouseButton } from 'types';
import { MouseMode } from '../../../../types/enums/mouseMode';
import { TRectArea } from '../../types';

// utils
import { mousePositionRelative } from 'shared';

export const handleResizeElementArea = (
  coordinates: T3DCoordinates,
  elementArea: TRectArea,
  event: MouseEvent,
  mouseMode: MouseMode,
  setElementArea: TFunc<[TRectArea]>,
): void => {
  if (elementArea && event.buttons === MouseButton.lmb && mouseMode === MouseMode.toolBeltA) {
    const { x, y } = mousePositionRelative(coordinates, event);

    setElementArea({ ...elementArea, x2: x, y2: y });
  }
};
