// types
import { TElement, TObject } from 'types';

export const getParentsAngles = (
  allData: TObject<TElement>,
  angles: Array<TElement['rotate']>,
  parentId: TElement['id'],
): Array<TElement['rotate']> => {
  if (parentId !== '-1') {
    const parent = allData[parentId];

    return getParentsAngles(
      allData,
      [...angles, parent.rotate],
      parent.parentId,
    );
  }

  return angles;
};
