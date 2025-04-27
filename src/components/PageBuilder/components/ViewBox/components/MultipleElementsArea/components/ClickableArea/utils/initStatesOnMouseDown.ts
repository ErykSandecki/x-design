import { Dispatch } from 'redux';
import { MouseEvent } from 'react';

// store
import { unselectElement } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export const initStatesOnMouseDown = (
  dispatch: Dispatch,
  event: MouseEvent,
  id: TElement['id'],
  setIsPressing: (isPressing: boolean) => void,
  setPossibleElementToSelect: (possibleElementToSelect: TElement['id']) => void,
) => {
  if (!event.shiftKey) {
    setIsPressing(true);
    setPossibleElementToSelect(id);
  } else {
    dispatch(unselectElement(id));
  }
};
