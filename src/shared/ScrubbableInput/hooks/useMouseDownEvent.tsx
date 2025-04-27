import { MouseEvent, RefObject } from 'react';

// types
import { T2DCoordinates } from 'types';

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  inputRef: RefObject<HTMLDivElement>,
  onMouseDown: () => void,
  setMousePosition: (mousePosition: T2DCoordinates) => void,
): TUseMouseDownEvent => {
  const handleMouseDown = (event: MouseEvent): void => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    onMouseDown();
    inputRef.current.requestPointerLock?.();
  };

  return handleMouseDown;
};
