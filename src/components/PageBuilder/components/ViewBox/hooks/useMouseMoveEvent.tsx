// types
import { MouseMode } from '../../../../../types/enums/mouseMode';
import { TRectArea, TRectAreaExtended } from '../../../../PageBuilder/types';

// utils
import { handleResizeElementArea } from '../utils/handleResizeElementArea';
import { handleResizeSelectableArea } from '../utils/handleResizeSelectableArea';

export type TUseMouseMoveEvent = TFunc<[MouseEvent]>;

export const useMouseMoveEvent = (
  coordinates: T3DCoordinates,
  elementArea: TRectArea,
  mouseMode: MouseMode,
  selectableArea: TRectAreaExtended,
  setElementArea: TFunc<[TRectArea]>,
  setSelectableArea: TFunc<[TRectAreaExtended]>,
): TUseMouseMoveEvent => {
  const handleMouseMove = (event: MouseEvent): void => {
    handleResizeElementArea(coordinates, elementArea, event, mouseMode, setElementArea);
    handleResizeSelectableArea(coordinates, event, mouseMode, selectableArea, setSelectableArea);
  };

  return handleMouseMove;
};
