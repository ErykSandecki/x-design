import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { selectedElementsSelector } from 'store/pageBuilder/selectors';
import { store } from 'store';
import { updateEventsStatus, updatePrevState } from 'store/pageBuilder/actions';

// types
import { T2DCoordinates } from 'types';

export const initSetElementsCoordinates = (
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent | React.MouseEvent,
  isMultiple: boolean,
): void => {
  if (isMultiple) {
    cursorPosition.current = {
      x: Math.round(event.clientX),
      y: Math.round(event.clientY),
    };
    const selectedElementsId = selectedElementsSelector(store.getState()).map(
      ({ id }) => id,
    );

    dispatch(updatePrevState());
    dispatch(
      updateEventsStatus({
        draggableElements: selectedElementsId,
        isMultipleMoving: true,
      }),
    );
  }
};
