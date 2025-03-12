import { RefObject, useEffect } from 'react';
import { throttle } from 'lodash';
import { useDispatch } from 'react-redux';

// others
import { THROTTLE_WAIT } from '../constants';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T2DCoordinates } from 'types';
import { TSelectedElement } from 'store/pageBuilder/types';

// utils
import { updateElementPosition } from '../utils/updateElementPosition';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  id: TSelectedElement['id'],
  isMoving: boolean,
  isMultiple: boolean,
  isPressing: boolean,
  mouseMode: MouseMode,
  position: T2DCoordinates,
  setIsMoving: (isMoving: boolean) => void,
): TUseMouseMoveEvent => {
  const dispatch = useDispatch();

  const handleMouseMove = throttle((event: MouseEvent): void => {
    if (isPressing && mouseMode === MouseMode.default) {
      setIsMoving(true);
      updateElementPosition(cursorPosition, dispatch, event, id, isMultiple);
    }
  }, THROTTLE_WAIT);

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMoving, isPressing, mouseMode, position.x, position.y]);
};
