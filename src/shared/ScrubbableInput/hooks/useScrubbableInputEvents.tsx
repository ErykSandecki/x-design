import { RefObject, useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// types

export type TUseScrubbableInputEvents = {
  mousePosition: T2DCoordinates;
  onMouseDown: TFunc<[React.MouseEvent<HTMLElement, MouseEvent>]>;
  onMouseUp: TFunc<[React.MouseEvent<HTMLElement, MouseEvent>]>;
};

export const useScrubbableInputEvents = (
  inputRef: RefObject<HTMLDivElement>,
  loop: boolean,
  max: number,
  min: number,
  onChange: (value: number) => void,
  onMouseDown: TFunc,
  onMouseUp: TFunc,
  value: number,
): TUseScrubbableInputEvents => {
  const [mousePosition, setMousePosition] = useState(null);

  useMouseMoveEvent(max, min, loop, mousePosition, onChange, setMousePosition, value);

  return {
    mousePosition,
    onMouseDown: useMouseDownEvent(inputRef, onMouseDown, setMousePosition),
    onMouseUp: useMouseUpEvent(onMouseUp, setMousePosition),
  };
};
