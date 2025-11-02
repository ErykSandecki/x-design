import { MouseEvent, RefObject, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';
import { useOutsideClick } from 'hooks';

// others
import { BASE_2D } from 'shared';

// store
import { unselectElements } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseClickableAreaEvents = {
  onMouseDown: TFunc<[MouseEvent, TElement['id']]>;
};

export const useClickableAreaEvents = (areaRef: RefObject<HTMLElement>): TUseClickableAreaEvents => {
  const cursorPosition = useRef(BASE_2D);
  const dispatch = useDispatch();
  const [possibleElementToSelect, setPossibleElementToSelect] = useState('-1');
  const [isMoving, setIsMoving] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  useOutsideClick([], areaRef, () => dispatch(unselectElements()), undefined, true);
  useMouseMoveEvent(cursorPosition, isPressing, setIsMoving);
  useMouseUpEvent(isMoving, possibleElementToSelect, setIsMoving, setIsPressing, setPossibleElementToSelect);

  return {
    onMouseDown: useMouseDownEvent(cursorPosition, setIsPressing, setPossibleElementToSelect),
  };
};
