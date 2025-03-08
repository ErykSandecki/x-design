import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

// types
import { MouseButton } from 'types';
import { MouseMode } from '../../../../../../../enums';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { handleSelectElement } from '../utils/handleSelectElement';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  isMultiple: boolean,
  isSelected: boolean,
  mouseMode: MouseMode,
  selectedElement: TSelectedElement,
  setIsPressing: (isPressing: boolean) => void,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (event: MouseEvent): void => {
    event.stopPropagation();

    if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
      setIsPressing(true);
      handleSelectElement(
        dispatch,
        event,
        isMultiple,
        isSelected,
        selectedElement,
      );
    }
  };

  return handleMouseDown;
};
