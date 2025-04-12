import { Dispatch } from 'redux';

// store
import { selectElements } from 'store/pageBuilder/actions';

// types
import { TSelectedElement } from 'store/pageBuilder/types';

export const handleTrySelectElement = (
  dispatch: Dispatch,
  event: MouseEvent,
  isMoving: boolean,
  isMultiple: boolean,
  isSelected: boolean,
  selectedElement: TSelectedElement,
): void => {
  const { shiftKey } = event;

  if (!isMoving && isMultiple && isSelected && !shiftKey) {
    dispatch(selectElements([selectedElement]));
  }
};
