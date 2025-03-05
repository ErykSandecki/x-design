import { Dispatch } from 'redux';

// store
import { setSelectedElements } from 'store/pageBuilder/actions';

// types
import { TSelectedElement } from 'store/pageBuilder/types';

export const handleSelectElement = (
  dispatch: Dispatch,
  selectedElement: TSelectedElement,
): void => {
  dispatch(setSelectedElements([selectedElement]));
};
