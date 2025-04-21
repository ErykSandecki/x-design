import { MouseEvent } from 'react';

// types
import { TElement } from 'types';

export const initStatesOnMouseDown = (
  event: MouseEvent,
  id: TElement['id'],
  setIsPressing: (isPressing: boolean) => void,
  setPossibleElementToSelect: (possibleElementToSelect: TElement['id']) => void,
) => {
  if (!event.shiftKey) {
    setIsPressing(true);
    setPossibleElementToSelect(id);
  }
};
