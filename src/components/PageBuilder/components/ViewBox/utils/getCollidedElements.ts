import { RefObject } from 'react';

// store
import { allDataSelector, eventsSelector, selectedElementsSelector } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { KeyboardKeys, TObject } from 'types';
import { TRectArea } from '../../../../PageBuilder/types';
import { TSelectedElements } from 'store/pageBuilder/types';

export const getBaseCoordinatesTopLeft = (selectableArea: TRectArea): TRectArea => {
  const { x1, x2, y1, y2 } = selectableArea;
  const xRect = x1 < x2 ? { x1: x1, x2: x2 } : { x1: x2, x2: x1 };
  const yRect = y1 < y2 ? { y1: y1, y2: y2 } : { y1: y2, y2: y1 };

  return { ...xRect, ...yRect };
};

export const getCollidedElements = (
  rectCoordinates: RefObject<TObject<TRectCoordinates>>,
  selectableArea: TRectArea,
): TSelectedElements => {
  const allData = allDataSelector(store.getState());
  const { pressedKey } = eventsSelector(store.getState());
  const { x1, x2, y1, y2 } = getBaseCoordinatesTopLeft(selectableArea);
  const prevCollidedElementsId = [];
  const selectedElements = selectedElementsSelector(store.getState());
  const prevIds = selectedElements.map(({ id }) => id);
  const collidedElements: TSelectedElements = [];
  const isControlPressed = [KeyboardKeys.meta, KeyboardKeys.control].includes(pressedKey);

  for (const [id, coordinates] of Object.entries(rectCoordinates.current)) {
    const { parentId, position, type } = allData[id];
    const condition = isControlPressed
      ? x1 <= coordinates.x1 && x2 >= coordinates.x2 && y1 <= coordinates.y1 && y2 >= coordinates.y2
      : !(coordinates.x2 < x1 || coordinates.x1 > x2 || coordinates.y2 < y1 || coordinates.y1 > y2);

    if (condition) {
      if (!prevIds.includes(id)) {
        collidedElements.push({
          id,
          parentId,
          position,
          type,
        });
      } else {
        prevCollidedElementsId.push(id);
      }
    }
  }

  return [...selectedElements.filter(({ id }) => prevCollidedElementsId.includes(id)), ...collidedElements];
};
