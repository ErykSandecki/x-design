import { noop, throttle } from 'lodash';
import { useEffect } from 'react';

// others
import { THROTTLE_WAIT } from '../constants';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T2DCoordinates } from 'types';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  isPressing: boolean,
  mouseMode: MouseMode,
  position: T2DCoordinates,
): TUseMouseMoveEvent => {
  const handleMouseMove = throttle((event: MouseEvent): void => {
    if (handleMouseMove && isPressing && mouseMode !== MouseMode.comment) {
      noop();
    }
  }, THROTTLE_WAIT);

  useEffect(() => {
    if (isPressing) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPressing, mouseMode, position.x, position.y]);
};
