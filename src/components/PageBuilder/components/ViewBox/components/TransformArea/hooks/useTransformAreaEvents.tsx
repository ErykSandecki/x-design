import { RefObject, useRef } from 'react';

// assets
import IconDefault from 'assets/icons/cursors/default.png';
import IconResize from 'assets/icons/cursors/resize.png';
import IconRotate from 'assets/icons/cursors/rotate.png';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useChangeCursor } from 'hooks';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// others
import { BASE_2D } from 'shared';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { TElement } from 'types';
import { TUseMouseDownEvent, useMouseDownEvent } from './useMouseDownEvent';
import { TUseMouseEnterEvent, useMouseEnterEvent } from './useMouseEnterEvent';
import { TUseMouseLeaveEvent, useMouseLeaveEvent } from './useMouseLeaveEvent';

export type TUseTransformAreaEvents = TUseMouseDownEvent &
  TUseMouseEnterEvent &
  TUseMouseLeaveEvent;

export const useTransformAreaEvents = (
  angle: TElement['angle'],
  cursorAngle: number,
  elementRef: RefObject<HTMLDivElement>,
  height: TElement['height']['value'],
  id: TElement['id'],
  mouseMode: MouseMode,
  width: TElement['width']['value'],
  x: TElement['coordinates']['x'],
  y: TElement['coordinates']['y'],
): TUseTransformAreaEvents => {
  const { zoomBoxRef } = useRefs();
  const cursorBaseAngle = useRef(0);
  const cursorOffsetAngle = useRef(0);
  const cursorPosition = useRef(BASE_2D);
  const cursorResize = useChangeCursor(
    cursorAngle,
    zoomBoxRef,
    IconResize,
    IconDefault,
  );
  const cursorRotate = useChangeCursor(
    cursorAngle,
    zoomBoxRef,
    IconRotate,
    IconDefault,
  );
  const eventsMouseDown = useMouseDownEvent(
    angle,
    cursorBaseAngle,
    cursorOffsetAngle,
    cursorPosition,
    elementRef,
    mouseMode,
    cursorResize.onMouseDown,
    cursorRotate.onMouseDown,
  );
  const eventsMouseEnter = useMouseEnterEvent(
    cursorAngle,
    cursorResize.isPressing,
    cursorRotate.isPressing,
    cursorResize.onMouseEnter,
    cursorRotate.onMouseEnter,
  );
  const eventsMouseLeave = useMouseLeaveEvent(
    cursorResize.isPressing,
    cursorRotate.isPressing,
    cursorResize.onMouseLeave,
    cursorRotate.onMouseLeave,
  );

  useMouseMoveEvent(
    cursorBaseAngle,
    cursorOffsetAngle,
    cursorPosition,
    elementRef,
    height,
    id,
    width,
    x,
    y,
  );
  useMouseUpEvent();

  return {
    ...eventsMouseDown,
    ...eventsMouseEnter,
    ...eventsMouseLeave,
  };
};
