// types
import { MouseMode } from '../../../../../types/enums/mouseMode';
import { T3DCoordinates } from 'types';
import { TRectArea } from '../../../../PageBuilder/types';

// utils
import { handleResizeElementArea } from '../utils/handleResizeElementArea';
import { handleResizeSelectableArea } from '../utils/handleResizeSelectableArea';

export type TUseMouseMoveEvent = (event: MouseEvent) => void;

export const useMouseMoveEvent = (
  coordinates: T3DCoordinates,
  elementArea: TRectArea,
  mouseMode: MouseMode,
  selectableArea: TRectArea,
  setElementArea: (elementArea: TRectArea) => void,
  setSelectableArea: (elementArea: TRectArea) => void,
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
