// types
import { TElement, TObject } from 'types';
import { TElementStaticData } from '../types';

export const findMainParent = (
  parentId: TElement['parentId'],
  staticData: TObject<TElementStaticData>,
): TElement['id'] => {
  if (
    staticData[parentId].parentId !== '-1' &&
    staticData[parentId].parentId !== 'none'
  ) {
    return findMainParent(staticData[parentId].parentId, staticData);
  }

  return staticData[parentId].id;
};
