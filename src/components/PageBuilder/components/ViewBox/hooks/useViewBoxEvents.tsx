import { useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T3DCoordinates, TRectCoordinates } from 'types';

export type TUseViewBoxEvents = {
  elementArea: TRectCoordinates;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
};

export const useViewBoxEvents = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  setMouseMode: (mouseMode: MouseMode) => void,
): TUseViewBoxEvents => {
  const [elementArea, setElementArea] = useState<TRectCoordinates | null>(null);

  return {
    elementArea,
    onMouseDown: useMouseDownEvent(coordinates, mouseMode, setElementArea),
    onMouseMove: useMouseMoveEvent(
      coordinates,
      elementArea,
      mouseMode,
      setElementArea,
    ),
    onMouseUp: useMouseUpEvent(
      elementArea,
      mouseMode,
      setElementArea,
      setMouseMode,
    ),
  };
};
