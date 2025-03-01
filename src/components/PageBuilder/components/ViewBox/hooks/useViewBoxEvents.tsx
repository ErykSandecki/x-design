import { RefObject, useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// others
import { BASE_RECT } from 'shared';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T3DCoordinates, TRectCoordinates } from 'types';

export type TUseViewBoxEvents = {
  frameArea: TRectCoordinates;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
};

export const useViewBoxEvents = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  setMouseMode: (mouseMode: MouseMode) => void,
): TUseViewBoxEvents => {
  const [frameArea, setFrameArea] = useState<TRectCoordinates | null>(null);

  return {
    frameArea,
    onMouseDown: useMouseDownEvent(coordinates, mouseMode, setFrameArea),
    onMouseMove: useMouseMoveEvent(
      coordinates,
      frameArea,
      mouseMode,
      setFrameArea,
    ),
    onMouseUp: useMouseUpEvent(
      frameArea,
      mouseMode,
      setFrameArea,
      setMouseMode,
    ),
  };
};
