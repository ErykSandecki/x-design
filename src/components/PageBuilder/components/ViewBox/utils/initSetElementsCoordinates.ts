import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

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
    dispatch(updateEventsStatus({ isMultipleMoving: true }));
  }
};
