import { MouseEvent, useRef, useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// others
import { BASE_2D } from 'shared';

// types
import { TPageBuilderState } from 'store/pageBuilder/types';

export type TUseClickableAreaEvents = {
  onMouseDown: (event: MouseEvent) => void;
};

export const useClickableAreaEvents = (): TUseClickableAreaEvents => {
  const cursorPosition = useRef(BASE_2D);
  const prevState = useRef<TPageBuilderState>(null);
  const [isPressing, setIsPressing] = useState(false);

  useMouseMoveEvent(cursorPosition, isPressing, prevState);
  useMouseUpEvent(setIsPressing);

  return {
    onMouseDown: useMouseDownEvent(cursorPosition, prevState, setIsPressing),
  };
};
