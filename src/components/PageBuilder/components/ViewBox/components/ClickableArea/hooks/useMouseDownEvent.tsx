import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// types
import { MouseButton, T2DCoordinates, TElement } from 'types';

// utils
import { initSetElementsCoordinates } from '../../../utils/initSetElementsCoordinates';

export type TUseMouseDownEvent = (
  event: MouseEvent,
  id: TElement['id'],
) => void;

export const useMouseDownEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  setIsPressing: (isPressing: boolean) => void,
  setPossibleElementToSelect: (possibleElementToSelect: TElement['id']) => void,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (event: MouseEvent, id: TElement['id']): void => {
    if (event.buttons === MouseButton.lmb) {
      event.stopPropagation();
      initSetElementsCoordinates(cursorPosition, dispatch, event, true);

      if (!event.shiftKey) {
        setIsPressing(true);
        setPossibleElementToSelect(id);
      }
    }
  };

  return handleMouseDown;
};
