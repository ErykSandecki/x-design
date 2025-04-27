// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { T2DCoordinates, TElement } from 'types';

// utils
import { getAbsolutePosition } from 'store/pageBuilder/utils/getAbsolutePosition';

export const getCoordinates = (
  element: TElement,
  mainParentId: TElement['parentId'],
): T2DCoordinates => {
  if (element.alignment || element.parentId !== '-1') {
    const z = areaAxisSelectorCreator('z')(store.getState());
    return getAbsolutePosition(element.id, mainParentId, z);
  }

  return element.coordinates;
};
