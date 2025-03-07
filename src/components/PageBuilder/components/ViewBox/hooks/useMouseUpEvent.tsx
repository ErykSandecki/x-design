import { useDispatch } from 'react-redux';

// types
import { MouseMode } from '../../../enums';
import { TReactArea } from '../../../../PageBuilder/types';

// utils
import { handleCreateElement } from '../utils/handleCreateElement';

export type TUseMouseUpEvent = (event: MouseEvent) => void;

export const useMouseUpEvent = (
  elementArea: TReactArea,
  mouseMode: MouseMode,
  setElementArea: (elementArea: TReactArea) => void,
  setMouseMode: (mouseMode: MouseMode) => void,
  setSelectableArea: (elementArea: TReactArea) => void,
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
