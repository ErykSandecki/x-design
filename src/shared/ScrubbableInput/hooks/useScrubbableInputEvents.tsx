import { RefObject, useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// types
import { T2DCoordinates } from 'types';

export type TUseScrubbableInputEvents = {
  mousePosition: T2DCoordinates;
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseUp: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const useScrubbableInputEvents = (
  inputRef: RefObject<HTMLDivElement>,
  max: number,
  min: number,
  onChange: (value: number) => void,
  value: number,
): TUseScrubbableInputEvents => {
  const [mousePosition, setMousePosition] = useState(null);

  useMouseMoveEvent(max, min, mousePosition, onChange, setMousePosition, value);

  return {
    mousePosition,
    onMouseDown: useMouseDownEvent(inputRef, setMousePosition),
    onMouseUp: useMouseUpEvent(setMousePosition),
  };
};
