import { useDispatch } from 'react-redux';

// types
import { MouseMode } from '../../../../types/enums/mouseMode';
import { TRectAreaExtended } from '../../types';

// utils
import { handleCreateElement } from '../utils/handleCreateElement';

export type TUseMouseUpEvent = TFunc<[MouseEvent]>;

export const useMouseUpEvent = (
  mouseMode: MouseMode,
  setMouseMode: TFunc<[MouseMode]>,
  setSelectableArea: TFunc<[TRectAreaExtended]>,
): TUseMouseUpEvent => {
  const dispatch = useDispatch();

  const handleMouseUp = (): void => {
    handleCreateElement(dispatch, mouseMode, setMouseMode);
    setSelectableArea(null);
  };

  return handleMouseUp;
};
