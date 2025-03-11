import { Dispatch } from 'redux';

// store
import { updateEventsStauts } from 'store/pageBuilder/actions';

export const finishSetElementsCoordinates = (dispatch: Dispatch): void => {
  dispatch(updateEventsStauts({ isMultipleMoving: false }));
};
