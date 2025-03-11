import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// types
import { MouseButton, T2DCoordinates } from 'types';
import { MouseMode } from '../../../../../../../enums';
import { TPageBuilderState, TSelectedElement } from 'store/pageBuilder/types';

// utils
import { handleSelectElement } from '../utils/handleSelectElement';
import { updateCursorPosition } from '../utils/updateCursorPosition';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  isMultiple: boolean,
  isSelected: boolean,
  mouseMode: MouseMode,
  position: T2DCoordinates,
  prevState: RefObject<TPageBuilderState>,
  selectedElement: TSelectedElement,
  setIsPressing: (isPressing: boolean) => void,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (event: MouseEvent): void => {
    if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
      event.stopPropagation();

      updateCursorPosition(
        cursorPosition,
        dispatch,
        position,
        event,
        isMultiple,
        isSelected,
        prevState,
      );
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
