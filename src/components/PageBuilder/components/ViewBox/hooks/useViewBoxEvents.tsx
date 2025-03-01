import { MouseEvent, RefObject, useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';

// others
import { BASE_RECT } from 'shared';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T3DCoordinates, TRectCoordinates } from 'types';

export type TUseViewBoxEvents = {
  frameArea: TRectCoordinates;
  onMouseDown: (event: MouseEvent) => void;
};

export const useViewBoxEvents = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  setCoordinates: (coordinates: T3DCoordinates) => void,
  zoomBoxRef: RefObject<HTMLDivElement>,
): TUseViewBoxEvents => {
  const [frameArea, setFrameArea] = useState(BASE_RECT);

  return {
    frameArea,
    onMouseDown: useMouseDownEvent(mouseMode, setFrameArea),
  };
};
