import { get } from 'lodash';

// types
import { TElement, TNestedKeyOf } from 'types';
import { TElements, TSelectedElement, TSelectedElements } from 'store/pageBuilder/types';

export const isMixed = (
  elements: TElements,
  firstElement: TSelectedElement,
  key: TNestedKeyOf<TElement>,
  selectedElements: TSelectedElements,
): boolean =>
  selectedElements
    .filter(({ id }) => id !== firstElement.id)
    .some(({ id }) => get(elements[id], key) !== get(elements[firstElement.id], key));
