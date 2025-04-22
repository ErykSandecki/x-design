import { useDispatch } from 'react-redux';

// types
import { MouseMode } from '../../../../../types/enums/mouseMode';
import { TRectArea } from '../../../../PageBuilder/types';

// utils
import { handleCreateElement } from '../utils/handleCreateElement';

export type TUseMouseUpEvent = (event: MouseEvent) => void;

export const useMouseUpEvent = (
  elementArea: TRectArea,
  mouseMode: MouseMode,
  setElementArea: (elementArea: TRectArea) => void,
  setMouseMode: (mouseMode: MouseMode) => void,
  setSelectableArea: (elementArea: TRectArea) => void,
): TUseMouseUpEvent => {
  const dispatch = useDispatch();

  const handleMouseUp = (): void => {
    handleCreateElement(
      dispatch,
      elementArea,
      mouseMode,
      setElementArea,
      setMouseMode,
    );
    setSelectableArea(null);
  };

  return handleMouseUp;
};
