import { MouseEvent, RefObject } from 'react';

// types
import { T2DCoordinates } from 'types';

export type TUseClickEvent = (event: MouseEvent) => void;

export const useClickEvent = (
  mousePosition: RefObject<T2DCoordinates>,
  setActiveSampler: (activeSampler: boolean) => void,
): TUseClickEvent => {
  const handleClick = (event: MouseEvent): void => {
    mousePosition.current = { x: event.clientX, y: event.clientY };
    setActiveSampler(true);
  };

  return handleClick;
};
