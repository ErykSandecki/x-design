import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// types
import { MouseButton, T2DCoordinates, TElement } from 'types';
import { MouseMode } from '../../../../../../../../../types/enums/mouseMode';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { handlePressing } from '../utils/handlePressing';
import { handleSelectElement } from '../utils/handleSelectElement';
import { updateCursorPosition } from '../utils/updateCursorPosition';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  alignment: TElement['alignment'],
  coordinates: T2DCoordinates,
  cursorPosition: RefObject<T2DCoordinates>,
  id: TSelectedElement['id'],
  isMultiple: boolean,
  isSelected: boolean,
  mainParentId: TElement['parentId'],
  mouseMode: MouseMode,
  selectedElement: TSelectedElement,
  setIsPressing: (isPressing: boolean) => void,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (event: MouseEvent): void => {
    if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
      event.stopPropagation();

      updateCursorPosition(
        alignment,
        coordinates,
        cursorPosition,
        event,
        id,
        isSelected,
        mainParentId,
      );
      handleSelectElement(
        dispatch,
        event,
        isMultiple,
        isSelected,
        selectedElement,
      );
      handlePressing(event, setIsPressing);
    }
  };

  return handleMouseDown;
};
