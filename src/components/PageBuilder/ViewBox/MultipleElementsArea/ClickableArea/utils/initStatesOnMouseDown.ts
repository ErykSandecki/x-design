import { Dispatch } from '@reduxjs/toolkit';
import { MouseEvent } from 'react';

// store
import { unselectElement } from 'store/pageBuilder/reducer';

// types
import { TElement } from 'types';

export const initStatesOnMouseDown = (
  dispatch: Dispatch,
  event: MouseEvent,
  id: TElement['id'],
  setIsPressing: TFunc<[boolean]>,
  setPossibleElementToSelect: TFunc<[TElement['id']]>,
): void => {
  if (!event.shiftKey) {
    setIsPressing(true);
    setPossibleElementToSelect(id);
  } else {
    dispatch(unselectElement(id));
  }
};
