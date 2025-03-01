// types
import { MouseMode } from '../../../enums';
import { TRectCoordinates } from 'types';

// utils
import { handleCreateElement } from '../utils/handleCreateElement';

export type TUseMouseUpEvent = (event: MouseEvent) => void;

export const useMouseUpEvent = (
  frameArea: TRectCoordinates,
  mouseMode: MouseMode,
  setFrameArea: (frameArea: TRectCoordinates) => void,
  setMouseMode: (mouseMode: MouseMode) => void,
): TUseMouseUpEvent => {
  const handleMouseUp = (): void => {
    handleCreateElement(frameArea, mouseMode, setFrameArea, setMouseMode);
  };

  return handleMouseUp;
};
