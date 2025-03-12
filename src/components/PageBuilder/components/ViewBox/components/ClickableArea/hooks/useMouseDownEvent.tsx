import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// types
import { MouseButton, T2DCoordinates } from 'types';

// utils
import { initSetElementsCoordinates } from '../../../utils/initSetElementsCoordinates';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  setIsPressing: (isPressing: boolean) => void,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (event: MouseEvent) => {
    if (event.buttons === MouseButton.lmb) {
      event.stopPropagation();
      initSetElementsCoordinates(cursorPosition, dispatch, event, true);
      setIsPressing(true);
    }
  };

  return handleMouseDown;
};
