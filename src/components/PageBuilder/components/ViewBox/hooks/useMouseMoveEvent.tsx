// types
import { MouseMode } from '../../../enums';
import { T3DCoordinates, TRectCoordinates } from 'types';

// utils
import { handleResizeElement } from '../utils/handleResizeElement';

export type TUseMouseMoveEvent = (event: MouseEvent) => void;

export const useMouseMoveEvent = (
  coordinates: T3DCoordinates,
  elementArea: TRectCoordinates,
  mouseMode: MouseMode,
  setElementArea: (elementArea: TRectCoordinates) => void,
): TUseMouseMoveEvent => {
  const handleMouseMove = (event: MouseEvent): void => {
    handleResizeElement(
      coordinates,
      elementArea,
      event,
      mouseMode,
      setElementArea,
    );
  };

  return handleMouseMove;
};
