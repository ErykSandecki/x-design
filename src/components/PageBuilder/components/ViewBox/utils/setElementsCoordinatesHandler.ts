import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { setElementsCoordinates } from 'store/pageBuilder/actions';
import { store } from 'store';

// types
import { T2DCoordinates } from 'types';

export const setElementsCoordinatesHandler = (
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent,
): void => {
  const z = areaAxisSelectorCreator('z')(store.getState());
  const { x, y } = cursorPosition.current;

  const coordinates = {
    x: Math.round(event.clientX / z - x / z),
    y: Math.round(event.clientY / z - y / z),
  };

  dispatch(setElementsCoordinates(coordinates));
};
