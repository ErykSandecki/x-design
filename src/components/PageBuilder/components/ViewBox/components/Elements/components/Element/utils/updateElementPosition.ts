import { RefObject } from 'react';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { T2DCoordinates } from 'types';

export const updateElementPosition = (
  cursorPosition: RefObject<T2DCoordinates>,
  event: MouseEvent,
  onUpdateCoordinatesDelay: (position: T2DCoordinates) => void,
  setPosition: (position: T2DCoordinates) => void,
) => {
  const z = areaAxisSelectorCreator('z')(store.getState());
  const { x, y } = cursorPosition.current;
  const coordinates = {
    x: Math.round(event.clientX / z - x / z),
    y: Math.round(event.clientY / z - y / z),
  };

  onUpdateCoordinatesDelay(coordinates);
  setPosition(coordinates);
};
