import { RefObject, useEffect } from 'react';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseButton, T2DCoordinates, T3DCoordinates } from 'types';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  coordinates: T3DCoordinates,
  cursorPosition: RefObject<T2DCoordinates>,
  cursorState: string,
  setCoordinates: (coordinates: T3DCoordinates) => void,
): TUseMouseMoveEvent => {
  const handleMouseMove = (event: MouseEvent): void => {
    const { x, y } = cursorPosition.current;
    const cursor = cursorState as (typeof CURSOR_STATES)[number];

    if (event.buttons === MouseButton.rmb && cursor === 'rmb') {
      setCoordinates({
        ...coordinates,
        x: event.clientX - x,
        y: event.clientY - y,
      });
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [
    coordinates,
    cursorPosition.current.x,
    cursorPosition.current.y,
    cursorState,
    setCoordinates,
  ]);
};
