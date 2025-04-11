import { Dispatch } from 'redux';
import { MouseEvent } from 'react';

// store
import {
  selectElement,
  unselectElement,
  selectElements,
} from 'store/pageBuilder/actions';

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
  const { parentId } = selectedElement;
  const isOutside = parentId === '-1';
  const canTrigger = (!isSelected && isMultiple && isOutside) || !isMultiple;

  if (isOutside && shiftKey && !isSelected) {
    dispatch(selectElement(selectedElement));
  } else if (isOutside && shiftKey && isSelected) {
    dispatch(unselectElement(selectedElement.id));
  } else if (canTrigger && !shiftKey) {
    dispatch(selectElements({ [selectedElement.id]: selectedElement }));
  }
};
