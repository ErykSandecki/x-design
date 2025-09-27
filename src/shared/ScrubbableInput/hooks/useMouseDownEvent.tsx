import { MouseEvent, RefObject } from 'react';

// types

export type TUseMouseDownEvent = (event: MouseEvent) => void;

export const useMouseDownEvent = (
  inputRef: RefObject<HTMLDivElement>,
  onMouseDown: TFunc,
  setMousePosition: (mousePosition: T2DCoordinates) => void,
): TUseMouseDownEvent => {
  const handleMouseDown = (event: MouseEvent): void => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    onMouseDown();
    inputRef.current.requestPointerLock?.();
  };

  return handleMouseDown;
};
