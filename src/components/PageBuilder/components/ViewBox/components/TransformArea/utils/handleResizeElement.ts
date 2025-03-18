import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { setElementSizes } from 'store/pageBuilder/actions';
import { store } from 'store';

// types
import { T2DCoordinates, TElement } from 'types';

export const handleResizeElement = (
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent,
  height: TElement['height'],
  id: TElement['id'],
  width: TElement['width'],
  x: TElement['positionAbsolute']['x'],
  y: TElement['positionAbsolute']['y'],
): void => {
  const z = areaAxisSelectorCreator('z')(store.getState());
  const { current } = cursorPosition;
  const baseCoordinates = {
    x1: x,
    x2: x + width,
    y1: y,
    y2: y + height,
  };
  const mousePosition = {
    x: Math.round(event.clientX / z - current.x / z),
    y: Math.round(event.clientY / z - current.y / z),
  };

  dispatch(setElementSizes(baseCoordinates, height, id, mousePosition, width));
};
