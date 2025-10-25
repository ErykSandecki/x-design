import { cloneDeep } from 'lodash';

// types
import { TElement } from 'types';
import { TEvents } from 'store/pageBuilder/types';

export const getNextParentChildren = (
  index: number,
  isGridDropArea: TEvents['isGridDropArea'],
  nextChildren: TElement['children'],
  parentHasChanged: boolean,
  prevChildren: TElement['children'],
): TElement['children'] => {
  if (parentHasChanged) {
    return isGridDropArea ? nextChildren.filter((_, i) => i !== index) : nextChildren;
  }

  return cloneDeep(prevChildren);
};
