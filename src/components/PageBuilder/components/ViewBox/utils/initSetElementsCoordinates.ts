import { cloneDeep } from 'lodash';
import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { pageBuilderStateSelector } from 'store/pageBuilder/selectors';
import { store } from 'store';
import { updateEventsStauts } from 'store/pageBuilder/actions';

// types
import { T2DCoordinates } from 'types';
import { TPageBuilderState } from 'store/pageBuilder/types';

export const initSetElementsCoordinates = (
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent | React.MouseEvent,
  isMultiple: boolean,
  prevState: RefObject<TPageBuilderState>,
): void => {
  if (isMultiple) {
    prevState.current = cloneDeep(pageBuilderStateSelector(store.getState()));
    cursorPosition.current = {
      x: Math.round(event.clientX),
      y: Math.round(event.clientY),
    };
    dispatch(updateEventsStauts({ isMultipleMoving: true }));
  }
};
