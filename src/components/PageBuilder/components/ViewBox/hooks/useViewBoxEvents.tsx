import { KeyboardEvent, useRef, useState } from 'react';

// hooks
import { useHandleSelectElement } from './useHandleSelectElement';
import { useKeyDownEvent } from './useKeyDownEvent';
import { useKeyUpEvent } from './useKeyUpEvent';
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T3DCoordinates, TObject, TRectCoordinates } from 'types';
import { TRectArea } from '../../../../PageBuilder/types';

export type TUseViewBoxEvents = {
  elementArea: TRectArea;
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp: () => void;
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
  const rectCoordinates = useRef<TObject<TRectCoordinates>>({});
  const [elementArea, setElementArea] = useState<TRectArea>(null);
  const [selectableArea, setSelectableArea] = useState<TRectArea>(null);

  useHandleSelectElement(rectCoordinates, selectableArea);

  return {
    elementArea,
    onKeyDown: useKeyDownEvent(),
    onKeyUp: useKeyUpEvent(),
    onMouseDown: useMouseDownEvent(
      coordinates,
      mouseMode,
      rectCoordinates,
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
