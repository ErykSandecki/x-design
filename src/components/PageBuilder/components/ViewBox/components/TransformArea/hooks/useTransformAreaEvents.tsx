import { useRef } from 'react';

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
  height: TElement['height'],
  id: TElement['id'],
  mouseMode: MouseMode,
  width: TElement['width'],
  x: TElement['coordinates']['x'],
  y: TElement['coordinates']['y'],
): TUseTransformAreaEvents => {
  const cursorPosition = useRef(BASE_2D);
  const events = useMouseDownEvent(cursorPosition, mouseMode);

  useMouseMoveEvent(cursorPosition, height, id, width, x, y);
  useMouseUpEvent();

  return events;
};
