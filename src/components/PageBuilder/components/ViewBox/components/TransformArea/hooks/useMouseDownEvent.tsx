import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { AnchorResize } from 'store/pageBuilder/enums';
import { MouseButton, MouseMode, T2DCoordinates } from 'types';

export type TUseMouseDownEvent = (
  anchor: AnchorResize,
  event: MouseEvent,
) => void;

export const useMouseDownEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  mouseMode: MouseMode,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (anchor: AnchorResize, event: MouseEvent): void => {
    if (event.buttons === MouseButton.lmb && mouseMode === MouseMode.default) {
      event.stopPropagation();

      dispatch(
        updateEventsStatus({ isResizing: true, selectedAnchor: anchor }),
      );
      cursorPosition.current = {
        x: Math.round(event.clientX),
        y: Math.round(event.clientY),
      };
    }
  };

  return handleMouseDown;
};
