import { Dispatch } from 'redux';

// store
import { changeParent } from 'store/pageBuilder/actions';

// utils
import { finishSetElementsCoordinates } from '../../../../../utils/finishSetElementsCoordinates';

export const handleTriggerEvents = (
  dispatch: Dispatch,
  isMultiple: boolean,
): void => {
  if (!isMultiple) {
    finishSetElementsCoordinates(dispatch);
    dispatch(changeParent());
  }
};
