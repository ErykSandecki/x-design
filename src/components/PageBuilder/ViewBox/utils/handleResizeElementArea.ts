import { Dispatch } from 'redux';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { MouseButton } from 'types';
import { MouseMode } from '../../../../types/enums/mouseMode';
import { TEvents } from 'store/pageBuilder/types';

// utils
import { getElementAreaMouseCoordinates } from './getElementAreaMouseCoordinates';

export const handleResizeElementArea = (
  coordinates: T3DCoordinates,
  dispatch: Dispatch,
  event: MouseEvent,
  mouseMode: MouseMode,
  possibleElement: TEvents['possibleElement'],
): void => {
  if (possibleElement && event.buttons === MouseButton.lmb && mouseMode === MouseMode.toolBeltA) {
    const { x, y } = getElementAreaMouseCoordinates(coordinates, event, possibleElement.parentId);

    dispatch(updateEventsStatus({ possibleElement: { ...possibleElement, x2: x, y2: y } }));
  }
};
