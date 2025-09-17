import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';
import { MouseButton, MouseMode, T2DCoordinates } from 'types';

// utils
import { handleInitResizeElement } from '../utils/handleInitResizeElement';
import { handleInitRotateElement } from '../utils/handleInitRotateElement';

export type TUseMouseDownEvent = {
  onMouseDownAnchorResize: (anchor: AnchorResize, event: MouseEvent) => void;
  onMouseDownAnchorRotate: (anchor: AnchorRotate, event: MouseEvent) => void;
};

export const useMouseDownEvent = (
  cursorBaseAngle: RefObject<number>,
  cursorPosition: RefObject<T2DCoordinates>,
  elementRef: RefObject<HTMLDivElement>,
  mouseMode: MouseMode,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const canTriggerEvent = (event: MouseEvent): boolean =>
    event.buttons === MouseButton.lmb && mouseMode === MouseMode.default;

  const handleMouseDownAchnorResize = (
    anchor: AnchorResize,
    event: MouseEvent,
  ): void => {
    if (canTriggerEvent(event)) {
      event.stopPropagation();

      handleInitResizeElement(cursorPosition, event);
      dispatch(
        updateEventsStatus({ isResizing: true, selectedAnchorResize: anchor }),
      );
    }
  };

  const handleMouseDownAnchorRotate = (
    anchor: AnchorRotate,
    event: MouseEvent,
  ): void => {
    if (canTriggerEvent(event)) {
      event.stopPropagation();

      handleInitRotateElement(cursorBaseAngle, elementRef, event);
      dispatch(
        updateEventsStatus({ isRotating: true, selectedAnchorRotate: anchor }),
      );
    }
  };

  return {
    onMouseDownAnchorResize: handleMouseDownAchnorResize,
    onMouseDownAnchorRotate: handleMouseDownAnchorRotate,
  };
};
