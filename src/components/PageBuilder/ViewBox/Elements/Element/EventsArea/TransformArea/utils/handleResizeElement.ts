import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { resizeElement } from 'store/pageBuilder/actions';
import { store } from 'store';

// types
import { TElement } from 'types';

export const getRelativeXYMousePosition = (
  angle: TElement['angle'],
  mouseX: number,
  mouseY: number,
): T2DCoordinates => {
  switch (true) {
    case angle >= 45 && angle < 135:
      return { x: mouseY, y: -mouseX };
    case angle >= -135 && angle < -45:
      return { x: -mouseY, y: mouseX };
    default:
      return { x: mouseX, y: mouseY };
  }
};

export const handleResizeElement = (
  angle: TElement['angle'],
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent,
  flip: TElement['flip'],
  height: TElement['height']['value'],
  id: TElement['id'],
  width: TElement['width']['value'],
  x: TElement['coordinates']['x'],
  y: TElement['coordinates']['y'],
): void => {
  const { current } = cursorPosition;
  const z = areaAxisSelectorCreator('z')(store.getState());
  const x1 = x;
  const x2 = x + parseInt(width.toString());
  const y1 = y;
  const y2 = y + parseInt(height.toString());
  const mouseX = Math.round(event.clientX / z - current.x / z);
  const mouseY = Math.round(event.clientY / z - current.y / z);
  const mousePosition = getRelativeXYMousePosition(angle, mouseX, mouseY);
  const baseCoordinates = { x1, x2, y1, y2 };

  dispatch(resizeElement(baseCoordinates, flip, height, id, mousePosition, width));
};
