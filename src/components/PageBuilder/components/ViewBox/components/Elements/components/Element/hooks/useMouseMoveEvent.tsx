import { RefObject, useEffect } from 'react';
import { throttle } from 'lodash';
import { useDispatch } from 'react-redux';

// others
import { THROTTLE_WAIT } from '../constants';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { TElement } from 'types';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { distanceHasChanged } from 'utils';
import { updateElementPosition } from '../utils/updateElementPosition';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  cursorPositionBase: RefObject<T2DCoordinates>,
  id: TSelectedElement['id'],
  isPressing: boolean,
  mouseMode: MouseMode,
  parentId: TElement['parentId'],
  type: TElement['type'],
): TUseMouseMoveEvent => {
  const dispatch = useDispatch();

  const handleMouseMove = throttle((event: MouseEvent): void => {
    const distanceChanged = distanceHasChanged(cursorPositionBase.current, 5, event);

    if (mouseMode === MouseMode.default && distanceChanged) {
      updateElementPosition(cursorPosition, dispatch, event, parentId);
      dispatch(updateEventsStatus({ draggableElements: [{ id, type }] }));
    }
  }, THROTTLE_WAIT);

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return (): void => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPressing, mouseMode]);
};
