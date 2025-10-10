import { RefObject, useEffect } from 'react';
import { throttle } from 'lodash';
import { useDispatch } from 'react-redux';

// others
import { THROTTLE_WAIT } from '../../../constants';

// utils
import { setElementsCoordinatesHandler } from '../../../utils/setElementsCoordinatesHandler';

export type TUseMouseDownEvent = void;

export const useMouseMoveEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  isPressing: boolean,
  setIsMoving: TFunc<[boolean]>,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseMove = throttle((event: MouseEvent) => {
    setIsMoving(true);
    setElementsCoordinatesHandler(cursorPosition, dispatch, event);
  }, THROTTLE_WAIT);

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return (): void => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPressing]);
};
