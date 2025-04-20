// others
import { BASE_RECT } from 'shared';

// store
import {
  allDataSelector,
  areaAxisSelectorCreator,
} from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { T2DCoordinates, TElement, TRectCoordinates } from 'types';
import { TContext } from 'pages/PageBuilderPage/core/types';

// utils
import { findMainParent } from 'store/pageBuilder/utils/findMainParent';

export const getAbsolutePosition = (
  coordinates: T2DCoordinates,
  id: TElement['id'],
  parentId: TElement['parentId'],
  sharedRefs: TContext,
): TRectCoordinates => {
  if (sharedRefs[id]) {
    const height = parseInt(getComputedStyle(sharedRefs[id]).height);
    const width = parseInt(getComputedStyle(sharedRefs[id]).width);
    const z = areaAxisSelectorCreator('z')(store.getState());

    if (parentId !== '-1') {
      const allData = allDataSelector(store.getState());
      const mainParentId = findMainParent(parentId, allData);
      const parentCords = allData[mainParentId].coordinates;
      const { top: parentTop, left: parentLeft } =
        sharedRefs[mainParentId].getBoundingClientRect();
      const { top: childrenTop, left: childrenLeft } =
        sharedRefs[id].getBoundingClientRect();
      const offsetX = parentLeft - childrenLeft;
      const offsetY = parentTop - childrenTop;
      const x = parentCords.x - offsetX / z;
      const y = parentCords.y - offsetY / z;

      return {
        x1: x,
        x2: x + width,
        y1: y,
        y2: y + height,
      };
    }

    return {
      x1: coordinates.x,
      x2: coordinates.x + width,
      y1: coordinates.y,
      y2: coordinates.y + height,
    };
  }

  return BASE_RECT;
};
