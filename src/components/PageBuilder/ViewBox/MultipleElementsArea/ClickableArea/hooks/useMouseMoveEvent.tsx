import { RefObject, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// utils
import { setElementsCoordinatesHandler } from '../../../utils/setElementsCoordinatesHandler';

export type TUseMouseDownEvent = void;

export const useMouseMoveEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  isPressing: boolean,
  setIsMoving: TFunc<[boolean]>,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseMove = (event: MouseEvent): void => {
    setIsMoving(true);
    setElementsCoordinatesHandler(cursorPosition, dispatch, event);
  };

  useEffect(() => {
    if (isPressing) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return (): void => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isPressing]);
};
