import { Dispatch } from 'redux';
import { defer } from 'lodash';

// store
import { changeParent, updateEventsStatus } from 'store/pageBuilder/actions';
import { eventsSelector } from 'store/pageBuilder/selectors';
import { store } from 'store';

export const finishSetElementsCoordinates = (dispatch: Dispatch): void => {
  const { draggableElements, possibleIndexPosition, possibleParent } =
    eventsSelector(store.getState());

  dispatch(updateEventsStatus({ isMultipleMoving: false }));
  defer(() =>
    dispatch(
      changeParent(draggableElements, possibleIndexPosition, possibleParent),
    ),
  );
};
