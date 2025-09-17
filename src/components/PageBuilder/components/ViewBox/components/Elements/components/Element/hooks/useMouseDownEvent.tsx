import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// types
import { MouseButton, T2DCoordinates } from 'types';
import { MouseMode } from '../../../../../../../../../types/enums/mouseMode';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { handlePressing } from '../utils/handlePressing';
import { handleSelectElement } from '../utils/handleSelectElement';
import { updateCursorPosition } from '../utils/updateCursorPosition';
import { updatePrevState } from 'store/pageBuilder/actions';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  cursorPositionBase: RefObject<T2DCoordinates>,
  isMultiple: boolean,
  isSelected: boolean,
  mouseMode: MouseMode,
  selectedElement: TSelectedElement,
  setIsPressing: (isPressing: boolean) => void,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (event: MouseEvent): void => {
    if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
      cursorPositionBase.current = { x: event.clientX, y: event.clientY };
      event.stopPropagation();

      updateCursorPosition(cursorPosition, event);
      handleSelectElement(
        dispatch,
        event,
        isMultiple,
        isSelected,
        selectedElement,
      );
      handlePressing(event, setIsPressing);
      dispatch(updatePrevState());
    }
  };

  return handleMouseDown;
};
