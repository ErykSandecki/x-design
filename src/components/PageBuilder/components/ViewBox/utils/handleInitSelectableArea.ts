import { MouseEvent } from 'react';

// types
import { MouseButton } from 'types';
import { MouseMode } from '../../../../../types/enums/mouseMode';
import { TRectAreaExtended } from '../../../../PageBuilder/types';

// utils
import { mousePositionRelative } from 'shared';

export const handleInitSelectableArea = (
  coordinates: T3DCoordinates,
  event: MouseEvent,
  mouseMode: MouseMode,
  setSelectableArea: (elementArea: TRectAreaExtended) => void,
): void => {
  if (!event.shiftKey && event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
    const { x, y } = mousePositionRelative(coordinates, event);

    setSelectableArea({ visible: false, x1: x, x2: x, y1: y, y2: y });
  }
};
