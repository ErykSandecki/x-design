import { useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T3DCoordinates } from 'types';
import { TReactArea } from '../../../../PageBuilder/types';

export type TUseViewBoxEvents = {
  elementArea: TReactArea;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
  selectableArea: TReactArea;
};

export const useViewBoxEvents = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  setMouseMode: (mouseMode: MouseMode) => void,
): TUseViewBoxEvents => {
  const [elementArea, setElementArea] = useState<TReactArea>(null);
  const [selectableArea, setSelectableArea] = useState<TReactArea>(null);

  return {
    elementArea,
    onMouseDown: useMouseDownEvent(
      coordinates,
      mouseMode,
      setElementArea,
      setSelectableArea,
    ),
    onMouseMove: useMouseMoveEvent(
      coordinates,
      elementArea,
      mouseMode,
      selectableArea,
      setElementArea,
      setSelectableArea,
    ),
    onMouseUp: useMouseUpEvent(
      elementArea,
      mouseMode,
      setElementArea,
      setMouseMode,
      setSelectableArea,
    ),
    selectableArea,
  };
};
