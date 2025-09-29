import { MouseEvent, RefObject } from 'react';

// types

export type TUseMouseDownEvent = TFunc<[MouseEvent]>;

export const useMouseDownEvent = (
  inputRef: RefObject<HTMLDivElement>,
  onMouseDown: TFunc,
  setMousePosition: TFunc<[T2DCoordinates]>,
): TUseMouseDownEvent => {
  const handleMouseDown = (event: MouseEvent): void => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    onMouseDown();
    inputRef.current.requestPointerLock?.();
  };

  return handleMouseDown;
};
