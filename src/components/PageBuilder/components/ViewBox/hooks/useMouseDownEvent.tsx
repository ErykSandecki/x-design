import { MouseEvent } from 'react';

// types
import { MouseMode } from '../../../../PageBuilder/enums';
import { T3DCoordinates, TRectCoordinates } from 'types';

// utils
import { handleInitElement } from '../utils/handleInitElement';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  setElementArea: (elementArea: TRectCoordinates) => void,
): TUseMouseDownEvent => {
  const handleMouseDown = (event: MouseEvent): void => {
    handleInitElement(coordinates, event, mouseMode, setElementArea);
  };

  return handleMouseDown;
};
