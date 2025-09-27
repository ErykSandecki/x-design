import { MouseEvent, useRef, useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// others
import { BASE_2D } from 'shared';

// types
import { TElement } from 'types';

export type TUseClickableAreaEvents = {
  onMouseDown: (event: MouseEvent, id: TElement['id']) => void;
};

export const useClickableAreaEvents = (): TUseClickableAreaEvents => {
  const cursorPosition = useRef(BASE_2D);
  const [possibleElementToSelect, setPossibleElementToSelect] = useState('-1');
  const [isMoving, setIsMoving] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  useMouseMoveEvent(cursorPosition, isPressing, setIsMoving);
  useMouseUpEvent(isMoving, possibleElementToSelect, setIsMoving, setIsPressing, setPossibleElementToSelect);

  return {
    onMouseDown: useMouseDownEvent(cursorPosition, setIsPressing, setPossibleElementToSelect),
  };
};
