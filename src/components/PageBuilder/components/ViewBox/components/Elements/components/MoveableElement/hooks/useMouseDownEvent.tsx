import { useDispatch } from 'react-redux';

// types
import { MouseButton } from 'types';
import { MouseMode } from '../../../../../../../../PageBuilder/enums';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { handleSelectElement } from '../utils/handleSelectElement';

export type TUseMouseDownEvent = (
  event: React.MouseEvent<HTMLElement, MouseEvent>,
) => void;

export const useMouseDownEvent = (
  mouseMode: MouseMode,
  selectedElement: TSelectedElement,
  setIsPressing: (isPressing: boolean) => void,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
      setIsPressing(true);
      handleSelectElement(dispatch, selectedElement);
    }
  };

  return handleMouseDown;
};
