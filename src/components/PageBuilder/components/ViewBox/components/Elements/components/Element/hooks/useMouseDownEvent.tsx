import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// types
import { MouseButton, T2DCoordinates } from 'types';
import { MouseMode } from '../../../../../../../enums';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { handleSelectElement } from '../utils/handleSelectElement';
import { updateCursorPosition } from 'components/PageBuilder/components/ViewBox/utils/updateCursorPosition';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
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
      // updateCursorPosition(cursorPosition);
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
