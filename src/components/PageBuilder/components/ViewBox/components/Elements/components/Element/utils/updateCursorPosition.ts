import { Dispatch } from 'redux';
import { RefObject } from 'react';

// store
import { areaAxisSelectorCreator } from 'store/pageBuilder/selectors';
import { store } from 'store';

// types
import { T2DCoordinates, T3DCoordinates, TElement } from 'types';

// utils
import { getAbsolutePosition } from 'store/pageBuilder/utils/getAbsolutePosition';
import { initSetElementsCoordinates } from '../../../../../utils/initSetElementsCoordinates';

export const getPositionXY = (
  alignment: TElement['alignment'],
  coordinates: TElement['coordinates'],
  event: MouseEvent | React.MouseEvent,
  id: TElement['id'],
  mainParentId: TElement['parentId'],
  z: T3DCoordinates['z'],
) => {
  if (alignment?.horizontal || alignment?.vertical) {
    const { x, y } = getAbsolutePosition(id, mainParentId, z);

    return {
      x: Math.round(event.clientX - x),
      y: Math.round(event.clientY - y),
    };
  }

  return {
    x: Math.round(event.clientX - coordinates.x * z),
    y: Math.round(event.clientY - coordinates.y * z),
  };
};

export const updateCursorPosition = (
  alignment: TElement['alignment'],
  coordinates: TElement['coordinates'],
  cursorPosition: RefObject<T2DCoordinates>,
  dispatch: Dispatch,
  event: MouseEvent | React.MouseEvent,
  id: TElement['id'],
  isMultiple: boolean,
  isSelected: boolean,
  mainParentId: TElement['parentId'],
): void => {
  const z = areaAxisSelectorCreator('z')(store.getState());

  if (!isMultiple || !isSelected) {
    cursorPosition.current = getPositionXY(
      alignment,
      coordinates,
      event,
      id,
      mainParentId,
      z,
    );
  } else {
    // TODO probalby usuless
    initSetElementsCoordinates(cursorPosition, dispatch, event, true);
  }
};
