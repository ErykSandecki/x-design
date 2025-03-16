import { useRef } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// others
import { BASE_2D } from 'shared';

// types
import { Anchor } from 'store/pageBuilder/enums';
import { MouseMode } from 'components/PageBuilder/enums';
import { TElement } from 'types';

export type TUseResizeAreaEvents = {
  onMouseDown: (
    anchor: Anchor,
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => void;
};

export const useResizeAreaEvents = (
  height: TElement['height'],
  id: TElement['id'],
  mouseMode: MouseMode,
  width: TElement['width'],
  x: TElement['positionAbsolute']['x'],
  y: TElement['positionAbsolute']['y'],
): TUseResizeAreaEvents => {
  const cursorPosition = useRef(BASE_2D);

  useMouseMoveEvent(cursorPosition, height, id, width, x, y);
  useMouseUpEvent();

  return {
    onMouseDown: useMouseDownEvent(cursorPosition, mouseMode),
  };
};
