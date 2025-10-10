import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// store
import { updatePrevState } from 'store/pageBuilder/actions';

// types
import { MouseButton } from 'types';
import { MouseMode } from '../../../../../../types/enums/mouseMode';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { handlePressing } from '../utils/handlePressing';
import { handleSelectElement } from '../utils/handleSelectElement';
import { updateCursorPosition } from '../utils/updateCursorPosition';

export type TUseMouseDownEvent = TFunc<[MouseEvent]>;

export const useMouseDownEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  cursorPositionBase: RefObject<T2DCoordinates>,
  isMultiple: boolean,
  isSelected: boolean,
  mouseMode: MouseMode,
  selectedElement: TSelectedElement,
  setIsPressing: TFunc<[boolean]>,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (event: MouseEvent): void => {
    if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
      cursorPositionBase.current = { x: event.clientX, y: event.clientY };
      event.stopPropagation();

      updateCursorPosition(cursorPosition, event);
      handleSelectElement(dispatch, event, isMultiple, isSelected, selectedElement);
      handlePressing(event, setIsPressing);
      dispatch(updatePrevState());
    }
  };

  return handleMouseDown;
};
