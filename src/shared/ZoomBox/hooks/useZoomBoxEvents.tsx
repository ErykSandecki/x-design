import { MouseEvent, RefObject, useState, WheelEvent } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';
import { useWheelEvent } from './useWheelEvent';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { T3DCoordinates } from 'types';

export type TUseZoomBoxEvents = {
  cursorState: string;
  onMouseDown: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
  onWheel: (event: WheelEvent) => void;
};

export const useZoomBoxEvents = (
  coordinates: T3DCoordinates,
  setCoordinates: (coordinates: T3DCoordinates) => void,
  zoomBoxRef: RefObject<HTMLDivElement>,
): TUseZoomBoxEvents => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<string>(CURSOR_STATES[0]);

  return {
    cursorState,
    onMouseDown: useMouseDownEvent(
      coordinates,
      setCursorPosition,
      setCursorState,
    ),
    onMouseMove: useMouseMoveEvent(coordinates, cursorPosition, setCoordinates),
    onMouseUp: useMouseUpEvent(setCursorState),
    onWheel: useWheelEvent(coordinates, setCoordinates, zoomBoxRef),
  };
};
