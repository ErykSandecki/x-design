import { RefObject, useEffect } from 'react';
import { throttle } from 'lodash';
import { useDispatch } from 'react-redux';

// others
import { THROTTLE_WAIT } from '../../../constants';

// types
import { T2DCoordinates } from 'types';
import { TPageBuilderState } from 'store/pageBuilder/types';

// utils
import { setElementsCoordinatesHandler } from '../../../utils/setElementsCoordinatesHandler';

export type TUseMouseDownEvent = void;

export const useMouseMoveEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  isPressing: boolean,
  prevState: RefObject<TPageBuilderState>,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseMove = throttle((event: MouseEvent) => {
    setElementsCoordinatesHandler(cursorPosition, dispatch, event, prevState);
  }, THROTTLE_WAIT);

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPressing]);
};
