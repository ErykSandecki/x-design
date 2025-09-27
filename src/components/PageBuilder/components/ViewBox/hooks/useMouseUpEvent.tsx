import { useDispatch } from 'react-redux';

// types
import { MouseMode } from '../../../../../types/enums/mouseMode';
import { TRectArea, TRectAreaExtended } from '../../../../PageBuilder/types';

// utils
import { handleCreateElement } from '../utils/handleCreateElement';

export type TUseMouseUpEvent = TFunc<[MouseEvent]>;

export const useMouseUpEvent = (
  elementArea: TRectArea,
  mouseMode: MouseMode,
  setElementArea: TFunc<[TRectArea]>,
  setMouseMode: TFunc<[MouseMode]>,
  setSelectableArea: TFunc<[TRectAreaExtended]>,
): TUseMouseUpEvent => {
  const dispatch = useDispatch();

  const handleMouseUp = (): void => {
    handleCreateElement(dispatch, elementArea, mouseMode, setElementArea, setMouseMode);
    setSelectableArea(null);
  };

  return handleMouseUp;
};
