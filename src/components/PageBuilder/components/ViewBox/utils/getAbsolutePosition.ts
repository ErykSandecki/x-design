import { RefObject } from 'react';

// others
import { BASE_RECT } from 'shared';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { T2DCoordinates, TElement, TRectCoordinates } from 'types';
import { TContext } from 'pages/PageBuilderPage/core/types';

export const getAbsolutePosition = (
  coordinates: T2DCoordinates,
  id: TElement['id'],
  parentId: TElement['parentId'],
  sharedRefs: TContext['itemsRefs'],
  zoomContentRef: RefObject<HTMLDivElement | null>,
): TRectCoordinates => {
  if (sharedRefs[id]) {
    const height = parseInt(getComputedStyle(sharedRefs[id]).height);
    const width = parseInt(getComputedStyle(sharedRefs[id]).width);
    const z = areaAxisSelectorCreator('z')(store.getState());

    if (parentId !== '-1') {
      const diagramRect = zoomContentRef.current?.getBoundingClientRect();
      const blockRect = sharedRefs[id]?.getBoundingClientRect();

      const x = (blockRect?.left - diagramRect?.left) / z;
      const y = (blockRect?.top - diagramRect?.top) / z;

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
