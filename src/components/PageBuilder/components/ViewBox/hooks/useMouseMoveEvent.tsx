// types
import { MouseMode } from '../../../enums';
import { T3DCoordinates } from 'types';
import { TReactArea } from '../../../../PageBuilder/types';

// utils
import { handleResizeElementArea } from '../utils/handleResizeElementArea';
import { handleResizeSelectableArea } from '../utils/handleResizeSelectableArea';

export type TUseMouseMoveEvent = (event: MouseEvent) => void;

export const useMouseMoveEvent = (
  coordinates: T3DCoordinates,
  elementArea: TReactArea,
  mouseMode: MouseMode,
  selectableArea: TReactArea,
  setElementArea: (elementArea: TReactArea) => void,
  setSelectableArea: (elementArea: TReactArea) => void,
): TUseMouseMoveEvent => {
  const handleMouseMove = (event: MouseEvent): void => {
    handleResizeElementArea(
      coordinates,
      elementArea,
      event,
      mouseMode,
      setElementArea,
    );
    handleResizeSelectableArea(
      coordinates,
      event,
      mouseMode,
      selectableArea,
      setSelectableArea,
    );
  };

  return handleMouseMove;
};
