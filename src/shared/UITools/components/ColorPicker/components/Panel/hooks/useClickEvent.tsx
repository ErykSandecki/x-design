import { MouseEvent, RefObject } from 'react';

export type TUseClickEvent = TFunc<[MouseEvent]>;

export const useClickEvent = (mousePosition: RefObject<T2DCoordinates>, onClick: TFunc): TUseClickEvent => {
  const handleClick = (event: MouseEvent): void => {
    mousePosition.current = { x: event.clientX, y: event.clientY };
    onClick();
  };

  return handleClick;
};
