import { useDispatch } from 'react-redux';

// types
import { MouseMode } from '../../../enums';
import { TRectCoordinates } from 'types';

// utils
import { handleCreateElement } from '../utils/handleCreateElement';

export type TUseMouseUpEvent = (event: MouseEvent) => void;

export const useMouseUpEvent = (
  frameArea: TRectCoordinates,
  mouseMode: MouseMode,
  setFrameArea: (frameArea: TRectCoordinates) => void,
  setMouseMode: (mouseMode: MouseMode) => void,
): TUseMouseUpEvent => {
  const dispatch = useDispatch();

  const handleMouseUp = (): void => {
    handleCreateElement(
      dispatch,
      frameArea,
      mouseMode,
      setFrameArea,
      setMouseMode,
    );
  };

  return handleMouseUp;
};
