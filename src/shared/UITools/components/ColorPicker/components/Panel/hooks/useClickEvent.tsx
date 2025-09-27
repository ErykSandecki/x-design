import { MouseEvent, RefObject } from 'react';

// types

export type TUseClickEvent = (event: MouseEvent) => void;

export const useClickEvent = (mousePosition: RefObject<T2DCoordinates>, onClick: () => void): TUseClickEvent => {
  const handleClick = (event: MouseEvent): void => {
    mousePosition.current = { x: event.clientX, y: event.clientY };
    onClick();
  };

  return handleClick;
};
