import { RefObject, useEffect } from 'react';

// types
import { T2DCoordinates, T3DCoordinates } from 'types';

// utils
import { handleMoveArea } from '../utils/handleMoveArea';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  coordinates: T3DCoordinates,
  cursorPosition: RefObject<T2DCoordinates>,
  cursorState: string,
  depedencies: Array<any>,
  onMouseMove: (event: MouseEvent) => void,
  onUpdateCoordinates: ((coordinates: T3DCoordinates) => void) | null,
  setCoordinates: (coordinates: T3DCoordinates) => void,
): TUseMouseMoveEvent => {
  const handleMouseMove = (event: MouseEvent): void => {
    onMouseMove(event);
    handleMoveArea(
      coordinates,
      cursorPosition,
      cursorState,
      event,
      onUpdateCoordinates,
      setCoordinates,
    );
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
    ...depedencies,
  ]);
};
