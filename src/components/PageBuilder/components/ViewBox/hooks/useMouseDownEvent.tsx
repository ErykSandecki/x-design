import { MouseEvent } from 'react';

// types
import { MouseMode } from '../../../../PageBuilder/enums';
import { TRectCoordinates } from 'types';

// utils
import { handleInitFrame } from '../utils/handleInitFrame';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  mouseMode: MouseMode,
  setFrameArea: (frameArea: TRectCoordinates) => void,
): TUseMouseDownEvent => {
  const handleMouseDown = (event: MouseEvent): void => {
    handleInitFrame(event, mouseMode, setFrameArea);
  };

  return handleMouseDown;
};
