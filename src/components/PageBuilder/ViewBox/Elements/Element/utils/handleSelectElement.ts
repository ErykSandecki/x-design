import { Dispatch } from 'redux';
import { MouseEvent } from 'react';

// store
import { selectElement, unselectElement, selectElements } from 'store/pageBuilder/actions';

// types
import { TSelectedElement } from 'store/pageBuilder/types';

export const handleSelectElement = (
  dispatch: Dispatch,
  event: MouseEvent,
  isMultiple: boolean,
  isSelected: boolean,
  selectedElement: TSelectedElement,
): void => {
  const { shiftKey } = event;
  const canTrigger = (!isSelected && isMultiple) || !isMultiple;

  if (shiftKey && !isSelected) {
    dispatch(selectElement(selectedElement));
  } else if (shiftKey && isSelected) {
    dispatch(unselectElement(selectedElement.id));
  } else if (canTrigger && !shiftKey) {
    dispatch(selectElements([selectedElement]));
  }
};
