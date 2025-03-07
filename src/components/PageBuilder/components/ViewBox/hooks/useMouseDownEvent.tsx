import { MouseEvent } from 'react';

// types
import { MouseMode } from '../../../../PageBuilder/enums';
import { T3DCoordinates } from 'types';
import { TReactArea } from '../../../../PageBuilder/types';

// utils
import { handleInitElementArea } from '../utils/handleInitElementArea';
import { handleInitSelectableArea } from '../utils/handleInitSelectableArea';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  setElementArea: (elementArea: TReactArea) => void,
  setSelectableArea: (selectableArea: TReactArea) => void,
): TUseMouseDownEvent => {
  const handleMouseDown = (event: MouseEvent): void => {
    handleInitElementArea(coordinates, event, mouseMode, setElementArea);
    handleInitSelectableArea(coordinates, event, mouseMode, setSelectableArea);
  };

  return handleMouseDown;
};
