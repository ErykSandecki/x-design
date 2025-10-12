import { Dispatch } from 'redux';
import { MouseEvent } from 'react';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { MouseButton } from 'types';
import { MouseMode } from '../../../../types/enums/mouseMode';

// utils
import { getElementAreaMouseCoordinates } from './getElementAreaMouseCoordinates';

export const handleInitElementArea = (
  coordinates: T3DCoordinates,
  dispatch: Dispatch,
  event: MouseEvent,
  hoverOnElement: string,
  mouseMode: MouseMode,
): void => {
  if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.toolBeltA) {
    const { x, y } = getElementAreaMouseCoordinates(coordinates, event, hoverOnElement);

    dispatch(updateEventsStatus({ possibleElement: { parentId: hoverOnElement, x1: x, x2: x, y1: y, y2: y } }));
  }
};
