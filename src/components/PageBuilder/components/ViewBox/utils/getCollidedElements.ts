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
    const { height, id, parentId, position, type, width } = value;

    if (
      x1 < position.x + width &&
      x2 > position.x &&
      y1 < position.y + height &&
      y2 > position.y
    ) {
      collidedElements[key] = {
        coordinates: {
          x1: position.x,
          x2: position.x + width,
          y1: position.y,
          y2: position.y + height,
        },
        id,
        parentId,
        type,
      };
    }
  }

  return collidedElements;
};
