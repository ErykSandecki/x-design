import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { AnchorResize } from 'store/pageBuilder/enums';
import { MouseButton, MouseMode, T2DCoordinates } from 'types';

export type TUseMouseDownEvent = {
  onMouseDownAnchorResize: (anchor: AnchorResize, event: MouseEvent) => void;
};

export const useMouseDownEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  mouseMode: MouseMode,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDownAchnorResize = (
    anchor: AnchorResize,
    event: MouseEvent,
  ): void => {
    if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
      event.stopPropagation();

      dispatch(
        updateEventsStatus({ isResizing: true, selectedAnchorResize: anchor }),
      );
      cursorPosition.current = {
        x: Math.round(event.clientX),
        y: Math.round(event.clientY),
      };
    }
  };

  return {
    onMouseDownAnchorResize: handleMouseDownAchnorResize,
  };
};
