import { Dispatch } from 'redux';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

export const finishSetElementsCoordinates = (dispatch: Dispatch): void => {
  dispatch(updateEventsStatus({ isMultipleMoving: false }));
};
