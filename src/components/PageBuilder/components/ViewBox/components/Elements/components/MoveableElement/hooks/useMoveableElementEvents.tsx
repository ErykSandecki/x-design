import { useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T2DCoordinates } from 'types';

export type TUseMoveableElementEvents = {
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const useMoveableElementEvents = (
  mouseMode: MouseMode,
  position: T2DCoordinates,
): TUseMoveableElementEvents => {
  const [isPressing, setIsPressing] = useState(false);

  useMouseMoveEvent(isPressing, mouseMode, position);
  useMouseUpEvent(isPressing, setIsPressing);

  return {
    onMouseDown: useMouseDownEvent(mouseMode, setIsPressing),
  };
};
