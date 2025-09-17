import { RefObject } from 'react';

// store
import {
  areaAxisSelectorCreator,
  counterAngleSelectorCreator,
  elementAllDataSelectorCreator,
} from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { T2DCoordinates, TElement } from 'types';

export const caculateMovePosition = (
  cursorPosition: RefObject<T2DCoordinates>,
  event: MouseEvent,
  parentId: TElement['parentId'],
): T2DCoordinates => {
  const state = store.getState();
  const z = areaAxisSelectorCreator('z')(state);
  const { parentId: _parentId, rotate } =
    elementAllDataSelectorCreator(parentId)(state);
  const counterAngle = counterAngleSelectorCreator(_parentId)(state);
  const totalRotate = rotate - counterAngle;
  const angle = -totalRotate * (Math.PI / 180);
  const { x, y } = cursorPosition.current;
  const deltaX = event.clientX / z - x / z;
  const deltaY = event.clientY / z - y / z;

  return {
    x: deltaX * Math.cos(angle) - deltaY * Math.sin(angle),
    y: deltaX * Math.sin(angle) + deltaY * Math.cos(angle),
  };
};
