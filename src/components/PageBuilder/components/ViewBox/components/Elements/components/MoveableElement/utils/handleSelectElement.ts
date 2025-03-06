import { Dispatch } from 'redux';
import { MouseEvent } from 'react';

// store
import {
  addSelectedElement,
  removeSelectedElement,
  setSelectedElements,
} from 'store/pageBuilder/actions';

// types
import { TSelectedElement } from 'store/pageBuilder/types';

export const handleSelectElement = (
  dispatch: Dispatch,
  event: MouseEvent,
  isSelected: boolean,
  selectedElement: TSelectedElement,
  setSelected: (flag: boolean) => void,
): void => {
  const { shiftKey } = event;

  if (shiftKey && !isSelected) {
    dispatch(addSelectedElement(selectedElement));
  } else if (shiftKey && isSelected) {
    dispatch(removeSelectedElement(selectedElement.id));
  } else if (!shiftKey) {
    setSelected(true);
    dispatch(setSelectedElements({ [selectedElement.id]: selectedElement }));
  }
};
