// store
import { allDataSelector } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { TRectArea } from '../../../../PageBuilder/types';
import { TSelectedElements } from 'store/pageBuilder/types';

const getBaseCoordinatesTopLeft = (selectableArea: TRectArea): TRectArea => {
  const { x1, x2, y1, y2 } = selectableArea;
  const xRect = x1 < x2 ? { x1: x1, x2: x2 } : { x1: x2, x2: x1 };
  const yRect = y1 < y2 ? { y1: y1, y2: y2 } : { y1: y2, y2: y1 };

  return { ...xRect, ...yRect };
};

export const getCollidedElements = (
  selectableArea: TRectArea,
): TSelectedElements => {
  const allData = allDataSelector(store.getState());
  const collidedElements: TSelectedElements = {};
  const { x1, x2, y1, y2 } = getBaseCoordinatesTopLeft(selectableArea);

  for (const [key, value] of Object.entries(allData)) {
    const { height, id, parentId, positionAbsolute, type, width } = value;

    if (
      x1 < positionAbsolute.x + width &&
      x2 > positionAbsolute.x &&
      y1 < positionAbsolute.y + height &&
      y2 > positionAbsolute.y
    ) {
      collidedElements[key] = {
        coordinates: positionAbsolute,
        id,
        parentId,
        type,
      };
    }
  }

  return collidedElements;
};
