import { MouseEvent } from 'react';

// types
import { MouseMode } from '../../../../PageBuilder/enums';
import { TRectCoordinates } from 'types';

export const handleInitFrame = (
  event: MouseEvent,
  mouseMode: MouseMode,
  setFrameArea: (frameArea: TRectCoordinates) => void,
) => {
  if (mouseMode === MouseMode.toolBeltA) {
    // setFrameArea();
  }
};
