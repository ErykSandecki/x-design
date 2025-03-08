import { throttle } from 'lodash';
import { useEffect } from 'react';

// others
import { THROTTLE_WAIT } from '../constants';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T2DCoordinates } from 'types';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  isMoving: boolean,
  isPressing: boolean,
  mouseMode: MouseMode,
  position: T2DCoordinates,
  setIsMoving: (isMoving: boolean) => void,
): TUseMouseMoveEvent => {
  const handleMouseMove = throttle((event: MouseEvent): void => {
    if (isPressing && mouseMode === MouseMode.default) {
      setIsMoving(true);
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
