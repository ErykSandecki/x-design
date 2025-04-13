// store
import {
  allDataSelector,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';
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
  const prevCollidedElementsId = [];
  const selectedElements = selectedElementsSelector(store.getState());
  const prevIds = selectedElements.map(({ id }) => id);
  const collidedElements: TSelectedElements = [];
  const { x1, x2, y1, y2 } = getBaseCoordinatesTopLeft(selectableArea);

  // eslint-disable-next-line
  for (const [_, value] of Object.entries(allData)) {
    const { height, id, parentId, coordinates: position, type, width } = value;

    if (
      parentId === '-1' &&
      x1 < position.x + (width as number) &&
      x2 > position.x &&
      y1 < position.y + (height as number) &&
      y2 > position.y
    ) {
      if (!prevIds.includes(id)) {
        collidedElements.push({
          coordinates: {
            x1: position.x,
            x2: position.x + (width as number),
            y1: position.y,
            y2: position.y + (height as number),
          },
          id,
          parentId,
          type,
        });
      } else {
        prevCollidedElementsId.push(id);
      }
    }
  }

  return [
    ...selectedElements.filter(({ id }) => prevCollidedElementsId.includes(id)),
    ...collidedElements,
  ];
};
