import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { selectedElementsSelector } from 'store/pageBuilder/selectors';
import { setElementsCoordinates } from 'store/pageBuilder/actions';
import { store } from 'store';

// types

// utils
import { caculateMovePosition } from './caculateMovePosition';

export const setElementsCoordinatesHandler = (
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent,
): void => {
  const [first] = selectedElementsSelector(store.getState());
  const coordinates = caculateMovePosition(cursorPosition, event, first.parentId);

  dispatch(setElementsCoordinates(coordinates, 'dynamic'));
};
