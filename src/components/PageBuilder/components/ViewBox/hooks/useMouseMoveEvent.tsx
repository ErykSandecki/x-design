// types
import { MouseMode } from '../../../enums';
import { T3DCoordinates, TRectCoordinates } from 'types';

// utils
import { handleResizeFrame } from '../utils/handleResizeFrame';

export type TUseMouseMoveEvent = (event: MouseEvent) => void;

export const useMouseMoveEvent = (
  coordinates: T3DCoordinates,
  frameArea: TRectCoordinates,
  mouseMode: MouseMode,
  setFrameArea: (frameArea: TRectCoordinates) => void,
): TUseMouseMoveEvent => {
  const handleMouseMove = (event: MouseEvent): void => {
    handleResizeFrame(coordinates, event, frameArea, mouseMode, setFrameArea);
  };

  return handleMouseMove;
};
