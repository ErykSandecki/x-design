import { RefObject, useRef } from 'react';

// hooks
import { TUseMouseDownEvent, useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// others
import { BASE_2D } from 'shared';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { TElement } from 'types';

export type TUseTransformAreaEvents = TUseMouseDownEvent;

export const useTransformAreaEvents = (
  elementRef: RefObject<HTMLDivElement>,
  height: TElement['height'],
  id: TElement['id'],
  mouseMode: MouseMode,
  rotate: TElement['rotate'],
  width: TElement['width'],
  x: TElement['coordinates']['x'],
  y: TElement['coordinates']['y'],
): TUseTransformAreaEvents => {
  const cursorBaseAngle = useRef(0);
  const cursorPosition = useRef(BASE_2D);
  const events = useMouseDownEvent(
    cursorBaseAngle,
    cursorPosition,
    elementRef,
    mouseMode,
  );

  useMouseMoveEvent(
    cursorBaseAngle,
    cursorPosition,
    elementRef,
    height,
    id,
    rotate,
    width,
    x,
    y,
  );
  useMouseUpEvent();

  return events;
};
