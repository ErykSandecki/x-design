import { useRef, useState } from 'react';

// hooks
import { useHandleSelectElement } from './useHandleSelectElement';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { TObject } from 'types';
import { TRectAreaExtended } from '../../types';
import { TUseKeyDownEvent, useKeyDownEvent } from './useKeyDownEvent';
import { TUseKeyUpEvent, useKeyUpEvent } from './useKeyUpEvent';
import { TUseMouseDownEvent, useMouseDownEvent } from './useMouseDownEvent';
import { TUseMouseMoveEvent, useMouseMoveEvent } from './useMouseMoveEvent';
import { TUseMouseUpEvent, useMouseUpEvent } from './useMouseUpEvent';

export type TUseViewBoxEvents = {
  onKeyDown: TUseKeyDownEvent;
  onKeyUp: TUseKeyUpEvent;
  onMouseDown: TUseMouseDownEvent;
  onMouseMove: TUseMouseMoveEvent;
  onMouseUp: TUseMouseUpEvent;
  selectableArea: TRectAreaExtended;
};

export const useViewBoxEvents = (
  coordinates: T3DCoordinates,
  mouseMode: MouseMode,
  setMouseMode: TFunc<[MouseMode]>,
): TUseViewBoxEvents => {
  const rectCoordinates = useRef<TObject<TRectCoordinates>>({});
  const [selectableArea, setSelectableArea] = useState<TRectAreaExtended>(null);

  useHandleSelectElement(rectCoordinates, selectableArea);

  return {
    onKeyDown: useKeyDownEvent(),
    onKeyUp: useKeyUpEvent(),
    onMouseDown: useMouseDownEvent(coordinates, mouseMode, rectCoordinates, setSelectableArea),
    onMouseMove: useMouseMoveEvent(coordinates, mouseMode, selectableArea, setSelectableArea),
    onMouseUp: useMouseUpEvent(mouseMode, setMouseMode, setSelectableArea),
    selectableArea,
  };
};
