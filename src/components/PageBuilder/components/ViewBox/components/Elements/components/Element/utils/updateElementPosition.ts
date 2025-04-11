import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { setElementCoordinates } from 'store/pageBuilder/actions';
import { store } from 'store';

// types
import { T2DCoordinates } from 'types';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { setElementsCoordinatesHandler } from '../../../../../utils/setElementsCoordinatesHandler';

export const updateElementPosition = (
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent,
  id: TSelectedElement['id'],
  isMultiple: boolean,
) => {
  if (!isMultiple) {
    const z = areaAxisSelectorCreator('z')(store.getState());
    const { x, y } = cursorPosition.current;
    const coordinates = {
      x: Math.round(event.clientX / z - x / z),
      y: Math.round(event.clientY / z - y / z),
    };

    dispatch(setElementCoordinates(coordinates, id));
  } else {
    setElementsCoordinatesHandler(cursorPosition, dispatch, event);
  }
};
