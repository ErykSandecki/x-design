import { useState } from 'react';

// hooks
import { useHandleSelectElement } from './useHandleSelectElement';
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T3DCoordinates } from 'types';
import { TRectArea } from '../../../../PageBuilder/types';

export type TUseViewBoxEvents = {
  elementArea: TRectArea;
  onMouseDown: (event: React.MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
  selectableArea: TRectArea;
};

export const useViewBoxEvents = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  setMouseMode: (mouseMode: MouseMode) => void,
): TUseViewBoxEvents => {
  const [elementArea, setElementArea] = useState<TRectArea>(null);
  const [selectableArea, setSelectableArea] = useState<TRectArea>(null);

  useHandleSelectElement(selectableArea);

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
