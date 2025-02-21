import { MouseEvent } from 'react';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseButton } from 'types';

export type TUseMouseUpEvent = (event: MouseEvent) => void;

export const useMouseUpEvent = (
  setCursorState: (cursorState: string) => void,
): TUseMouseUpEvent => {
  const handleMouseUp = (): void => {
    setCursorState(CURSOR_STATES[MouseButton.idle]);
  };

  return handleMouseUp;
};
