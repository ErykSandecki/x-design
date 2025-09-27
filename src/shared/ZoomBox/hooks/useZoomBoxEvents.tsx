import { RefObject, useRef, useState, WheelEvent } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';
import { useWheelEvent } from './useWheelEvent';

// others
import { BASE_2D } from '../constants';
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseMode } from 'types/enums/mouseMode';

export type TUseZoomBoxEvents = {
  cursorState: string;
  onMouseDown: TFunc<[React.MouseEvent]>;
  onWheel: TFunc<[WheelEvent]>;
};

export const useZoomBoxEvents = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  onMouseDown: TFunc<[React.MouseEvent]>,
  onMouseMove: TFunc<[MouseEvent]>,
  onMouseMoveDepedencies: Array<any>,
  onMouseUp: TFunc<[MouseEvent]>,
  onMouseUpDepedencies: Array<any>,
  onUpdateCoordinates: TFunc<T3DCoordinates[]> | null,
  setCoordinates: TFunc<[T3DCoordinates]>,
  zoomBoxRef: RefObject<HTMLDivElement>,
): TUseZoomBoxEvents => {
  const cursorPosition = useRef(BASE_2D);
  const [cursorState, setCursorState] = useState<string>(CURSOR_STATES[0]);

  useMouseMoveEvent(
    coordinates,
    cursorPosition,
    cursorState,
    onMouseMoveDepedencies,
    mouseMode,
    onMouseMove,
    onUpdateCoordinates,
    setCoordinates,
  );
  useMouseUpEvent(onMouseUpDepedencies, onMouseUp, setCursorState);

  return {
    cursorState,
    onMouseDown: useMouseDownEvent(coordinates, cursorPosition, onMouseDown, setCursorState),
    onWheel: useWheelEvent(coordinates, onUpdateCoordinates, setCoordinates, zoomBoxRef),
  };
};
