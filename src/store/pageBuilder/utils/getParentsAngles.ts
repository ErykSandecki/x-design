// types
import { TElement, TObject } from 'types';

export const getParentsAngles = (
  allData: TObject<TElement>,
  angles: Array<TElement['angle']>,
  parentId: TElement['id'],
): Array<TElement['angle']> => {
  if (parentId !== '-1') {
    const parent = allData[parentId];

    return getParentsAngles(allData, [...angles, parent.angle], parent.parentId);
  }

  return angles;
};
