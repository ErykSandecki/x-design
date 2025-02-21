import { MouseEvent, RefObject, useState, WheelEvent } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useWheelEvent } from './useWheelEvent';

// types
import { T3DCoordinates } from 'types';

export type TUseZoomBoxEvents = {
  onMouseDown: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onWheel: (event: WheelEvent) => void;
};

export const useZoomBoxEvents = (
  coordinates: T3DCoordinates,
  setCoordinates: (coordinates: T3DCoordinates) => void,
  zoomBoxRef: RefObject<HTMLDivElement>,
): TUseZoomBoxEvents => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  return {
    onMouseDown: useMouseDownEvent(coordinates, setCursorPosition),
    onMouseMove: useMouseMoveEvent(coordinates, cursorPosition, setCoordinates),
    onWheel: useWheelEvent(coordinates, setCoordinates, zoomBoxRef),
  };
};
