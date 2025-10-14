import { RefObject } from 'react';

// others
import { BASE_RECT } from 'shared';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { TContext } from 'pages/PageBuilderPage/core/types';
import { TElement } from 'types';

// utils
import { getOriginElementBounding } from 'utils';

export const getAbsolutePosition = (
  id: TElement['id'],
  itemsRefs: TContext['itemsRefs'],
  zoomContentRef: RefObject<HTMLDivElement | null>,
): TRectCoordinates => {
  if (itemsRefs[id]) {
    const z = areaAxisSelectorCreator('z')(store.getState());
    const diagramRect = zoomContentRef.current?.getBoundingClientRect();
    const { left, top, width, height } = getOriginElementBounding(itemsRefs[id], z);
    const x = left - diagramRect?.left / z;
    const y = top - diagramRect?.top / z;

    return {
      x1: x,
      x2: x + width,
      y1: y,
      y2: y + height,
    };
  }

  return BASE_RECT;
};
