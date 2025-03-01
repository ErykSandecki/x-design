// types
import { MouseMode } from '../../../enums';
import { TRectCoordinates } from 'types';

export const handleCreateElement = (
  frameArea: TRectCoordinates,
  mouseMode: MouseMode,
  setFrameArea: (frameArea: TRectCoordinates) => void,
  setMouseMode: (mouseMode: MouseMode) => void,
): void => {
  if (frameArea && mouseMode === MouseMode.toolBeltA) {
    setFrameArea(null);
    setMouseMode(MouseMode.default);
  }
};
