import { debounce } from 'lodash';
import { RefObject, useCallback, useEffect } from 'react';

// others
import { DEBOUNCE_TIME } from 'constant/constants';

// types
import { T2DCoordinates, T3DCoordinates } from 'types';

// utils
import { handleMoveArea } from '../utils/handleMoveArea';
import { MouseMode } from 'types/enums/mouseMode';

export type TUseMouseMoveEvent = void;

export const useMouseMoveEvent = (
  coordinates: T3DCoordinates,
  cursorPosition: RefObject<T2DCoordinates>,
  cursorState: string,
  depedencies: Array<any>,
  mouseMode: MouseMode,
  onMouseMove: (event: MouseEvent) => void,
  onUpdateCoordinates: ((coordinates: T3DCoordinates) => void) | null,
  setCoordinates: (coordinates: T3DCoordinates) => void,
): TUseMouseMoveEvent => {
  const onUpdateCoordinatesDelay = useCallback(
    debounce((coordinates: T3DCoordinates) => {
      onUpdateCoordinates(coordinates);
    }, DEBOUNCE_TIME),
    [],
  );

  const handleMouseMove = (event: MouseEvent): void => {
    onMouseMove(event);
    handleMoveArea(
      coordinates,
      cursorPosition,
      cursorState,
      event,
      mouseMode,
      onUpdateCoordinatesDelay,
      setCoordinates,
    );
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return (): void => {
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
