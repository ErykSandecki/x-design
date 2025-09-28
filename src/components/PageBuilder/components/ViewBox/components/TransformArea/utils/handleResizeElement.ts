import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { resizeElement } from 'store/pageBuilder/actions';
import { store } from 'store';

// types
import { TElement } from 'types';

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
  const { current } = cursorPosition;
  const z = areaAxisSelectorCreator('z')(store.getState());
  const x1 = x;
  const x2 = x + parseInt(width as string);
  const y1 = y;
  const y2 = y + parseInt(height as string);
  const mouseX = Math.round(event.clientX / z - current.x / z);
  const mouseY = Math.round(event.clientY / z - current.y / z);
  const mousePosition = { x: mouseX, y: mouseY };
  const baseCoordinates = { x1, x2, y1, y2 };

  dispatch(resizeElement(baseCoordinates, height, id, mousePosition, width));
};
