import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { resizeElement } from 'store/pageBuilder/actions';
import { store } from 'store';

// types
import { T2DCoordinates, TElement } from 'types';

export const handleResizeElement = (
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent,
  height: TElement['height']['value'],
  id: TElement['id'],
  width: TElement['width']['value'],
  x: TElement['coordinates']['x'],
  y: TElement['coordinates']['y'],
): void => {
  const z = areaAxisSelectorCreator('z')(store.getState());
  const { current } = cursorPosition;
  const baseCoordinates = {
    x1: x,
    x2: x + parseInt(width as string),
    y1: y,
    y2: y + parseInt(height as string),
  };
  const mousePosition = {
    x: Math.round(event.clientX / z - current.x / z),
    y: Math.round(event.clientY / z - current.y / z),
  };

  dispatch(resizeElement(baseCoordinates, height, id, mousePosition, width));
};
