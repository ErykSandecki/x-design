import { RefObject } from 'react';

// store
import {
  areaAxisSelectorCreator,
  counterAngleSelectorCreator,
  elementAllDataSelectorCreator,
} from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { TElement } from 'types';

export const caculateMovePosition = (
  cursorPosition: RefObject<T2DCoordinates>,
  event: MouseEvent,
  parentId: TElement['parentId'],
): T2DCoordinates => {
  const state = store.getState();
  const z = areaAxisSelectorCreator('z')(state);
  const { angle, parentId: _parentId } = elementAllDataSelectorCreator(parentId)(state);
  const counterAngle = counterAngleSelectorCreator(_parentId)(state);
  const totalAngle = angle - counterAngle;
  const targetAngle = -totalAngle * (Math.PI / 180);
  const { x, y } = cursorPosition.current;
  const deltaX = event.clientX / z - x / z;
  const deltaY = event.clientY / z - y / z;

  return {
    x: deltaX * Math.cos(targetAngle) - deltaY * Math.sin(targetAngle),
    y: deltaX * Math.sin(targetAngle) + deltaY * Math.cos(targetAngle),
  };
};
