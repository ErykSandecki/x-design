import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { T2DCoordinates, TElement } from 'types';

// utils
import { initSetElementsCoordinates } from '../../../../../utils/initSetElementsCoordinates';

export const updateCursorPosition = (
  coordinates: TElement['coordinates'],
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent | React.MouseEvent,
  isMultiple: boolean,
  isSelected: boolean,
): void => {
  const z = areaAxisSelectorCreator('z')(store.getState());

  if (!isMultiple || !isSelected) {
    cursorPosition.current = {
      x: Math.round(event.clientX - coordinates.x * z),
      y: Math.round(event.clientY - coordinates.y * z),
    };
  } else {
    initSetElementsCoordinates(cursorPosition, dispatch, event, true);
  }
};
