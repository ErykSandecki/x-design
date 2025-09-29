import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { selectedElementsSelector } from 'store/pageBuilder/selectors';
import { store } from 'store';
import { updateEventsStatus, updatePrevState } from 'store/pageBuilder/actions';

// types

export const initSetElementsCoordinates = (
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent | React.MouseEvent,
  isMultiple: boolean,
): void => {
  if (isMultiple && !event.shiftKey) {
    cursorPosition.current = {
      x: Math.round(event.clientX),
      y: Math.round(event.clientY),
    };
    const selectedElements = selectedElementsSelector(store.getState()).map(({ id, type }) => ({ id, type }));

    dispatch(updatePrevState());
    dispatch(
      updateEventsStatus({
        draggableElements: selectedElements,
        isMultipleMoving: true,
      }),
    );
  }
};
