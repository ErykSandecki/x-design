import { useDispatch, useSelector } from 'react-redux';

// store
import { eventSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { MouseMode } from '../../../../types/enums/mouseMode';
import { TRectAreaExtended } from '../../types';

// utils
import { handleResizeElementArea } from '../utils/handleResizeElementArea';
import { handleResizeSelectableArea } from '../utils/handleResizeSelectableArea';

export type TUseMouseMoveEvent = TFunc<[MouseEvent]>;

export const useMouseMoveEvent = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  selectableArea: TRectAreaExtended,
  setSelectableArea: TFunc<[TRectAreaExtended]>,
): TUseMouseMoveEvent => {
  const dispatch = useDispatch();
  const possibleElement = useSelector(eventSelectorCreator('possibleElement'));

  const handleMouseMove = (event: MouseEvent): void => {
    handleResizeElementArea(coordinates, dispatch, event, mouseMode, possibleElement);
    handleResizeSelectableArea(coordinates, event, mouseMode, selectableArea, setSelectableArea);
  };

  return handleMouseMove;
};
