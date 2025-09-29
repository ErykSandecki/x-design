// types
import { TElement } from 'types';
import { TElements } from '../types';

export const findMainParent = (parentId: TElement['parentId'], elements: TElements): TElement['id'] => {
  if (elements[parentId].parentId !== '-1' && elements[parentId].parentId !== 'none') {
    return findMainParent(elements[parentId].parentId, elements);
  }

  return elements[parentId].id;
};
