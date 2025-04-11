import { Dispatch } from 'redux';

// utils
import { finishSetElementsCoordinates } from '../../../../../utils/finishSetElementsCoordinates';

export const handleTriggerEvents = (
  dispatch: Dispatch,
  isMultiple: boolean,
): void => {
  if (!isMultiple) {
    finishSetElementsCoordinates(dispatch);
  }
};
