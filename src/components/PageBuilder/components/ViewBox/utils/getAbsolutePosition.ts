import { RefObject } from 'react';

// others
import { BASE_RECT } from 'shared';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { TContext } from 'pages/PageBuilderPage/core/types';
import { TElement } from 'types';

export const getAbsolutePosition = (
  id: TElement['id'],
  itemsRefs: TContext['itemsRefs'],
  zoomContentRef: RefObject<HTMLDivElement | null>,
): TRectCoordinates => {
  if (itemsRefs[id]) {
    const height = parseInt(getComputedStyle(itemsRefs[id]).height);
    const width = parseInt(getComputedStyle(itemsRefs[id]).width);
    const z = areaAxisSelectorCreator('z')(store.getState());

    const diagramRect = zoomContentRef.current?.getBoundingClientRect();
    const blockRect = itemsRefs[id]?.getBoundingClientRect();

    const x = (blockRect?.left - diagramRect?.left) / z;
    const y = (blockRect?.top - diagramRect?.top) / z;

    return {
      x1: x,
      x2: x + width,
      y1: y,
      y2: y + height,
    };
  }

  return BASE_RECT;
};
