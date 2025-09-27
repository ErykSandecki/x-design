import { useEffect } from 'react';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseButton } from 'types';

export type TUseMouseUpEvent = void;

export const useMouseUpEvent = (
  depedencies: Array<any>,
  onMouseUp: TFunc<[MouseEvent]>,
  setCursorState: TFunc<[string]>,
): TUseMouseUpEvent => {
  const handleMouseUp = (event: MouseEvent): void => {
    onMouseUp(event);
    setCursorState(CURSOR_STATES[MouseButton.idle]);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return (): void => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [setCursorState, ...depedencies]);
};
