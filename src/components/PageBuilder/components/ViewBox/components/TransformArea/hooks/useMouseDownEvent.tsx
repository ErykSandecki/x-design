import { MouseEvent, RefObject } from 'react';
import { useDispatch } from 'react-redux';

// store
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { Anchor } from 'store/pageBuilder/enums';
import { MouseButton, T2DCoordinates } from 'types';
import { MouseMode } from '../../../../../enums';

export type TUseMouseDownEvent = (anchor: Anchor, event: MouseEvent) => void;

export const useMouseDownEvent = (
  cursorPosition: RefObject<T2DCoordinates>,
  mouseMode: MouseMode,
): TUseMouseDownEvent => {
  const dispatch = useDispatch();

  const handleMouseDown = (anchor: Anchor, event: MouseEvent): void => {
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
