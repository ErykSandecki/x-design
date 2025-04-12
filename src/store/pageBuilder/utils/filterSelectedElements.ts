import { size } from 'lodash';

// types
import { TSelectedElements } from '../types';

export const filterSelectedElements = (
  selectedElements: TSelectedElements,
): TSelectedElements =>
  size(selectedElements) === 1
    ? selectedElements
    : selectedElements.filter(({ parentId }) => parentId === '-1');
