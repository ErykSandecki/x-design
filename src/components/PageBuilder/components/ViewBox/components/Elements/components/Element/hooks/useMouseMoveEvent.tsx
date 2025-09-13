import { RefObject, useEffect } from 'react';
import { throttle } from 'lodash';
import { useDispatch } from 'react-redux';

// others
import { THROTTLE_WAIT } from '../constants';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { T2DCoordinates } from 'types';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { distanceHasChanged } from '../utils/distanceHasChanged';
import { updateElementPosition } from '../utils/updateElementPosition';
import { updateEventsStatus } from 'store/pageBuilder/actions';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  coordinates: T2DCoordinates,
  cursorPosition: RefObject<T2DCoordinates>,
  cursorPositionBase: RefObject<T2DCoordinates>,
  id: TSelectedElement['id'],
  isMultiple: boolean,
  isPressing: boolean,
  mouseMode: MouseMode,
): TUseMouseMoveEvent => {
  const dispatch = useDispatch();

  const handleMouseMove = throttle((event: MouseEvent): void => {
    if (
      mouseMode === MouseMode.default &&
      distanceHasChanged(event, cursorPositionBase)
    ) {
      updateElementPosition(cursorPosition, dispatch, event, id, isMultiple);
      dispatch(updateEventsStatus({ draggableElements: [id] }));
    }
  }, THROTTLE_WAIT);

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPressing, mouseMode, coordinates.x, coordinates.y]);
};
