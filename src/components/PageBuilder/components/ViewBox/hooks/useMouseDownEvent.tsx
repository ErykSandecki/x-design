import { MouseEvent } from 'react';

// types
import { MouseMode } from '../../../../PageBuilder/enums';
import { T3DCoordinates, TRectCoordinates } from 'types';

// utils
import { handleInitFrame } from '../utils/handleInitFrame';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  setFrameArea: (frameArea: TRectCoordinates) => void,
): TUseMouseDownEvent => {
  const handleMouseDown = (event: MouseEvent): void => {
    handleInitFrame(coordinates, event, mouseMode, setFrameArea);
  };

  return handleMouseDown;
};
