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
): TUseMouseMoveEvent => {
  const dispatch = useDispatch();

  const handleMouseMove = throttle((event: MouseEvent): void => {
    if (mouseMode === MouseMode.default && distanceHasChanged(cursorPositionBase.current, 5, event)) {
      updateElementPosition(cursorPosition, dispatch, event, parentId);
      dispatch(updateEventsStatus({ draggableElements: [id] }));
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
