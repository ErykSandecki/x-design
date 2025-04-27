import { Dispatch } from 'redux';
import { defer } from 'lodash';

// store
import { changeParent } from 'store/pageBuilder/actions';
import { eventsSelector } from 'store/pageBuilder/selectors';
import { store } from 'store';

export const handleTriggerEvents = (dispatch: Dispatch): void => {
  const { draggableElements, possibleIndexPosition, possibleParent } =
    eventsSelector(store.getState());

  defer(() =>
    dispatch(
      changeParent(draggableElements, possibleIndexPosition, possibleParent),
    ),
  );
};
