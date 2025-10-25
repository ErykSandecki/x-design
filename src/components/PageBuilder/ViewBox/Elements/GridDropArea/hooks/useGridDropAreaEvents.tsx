// types
import { MouseMode, TElement } from 'types';
import { TUseMouseEnterEvent, useMouseEnterEvent } from './useMouseEnterEvent';
import { TUseMouseLeaveEvent, useMouseLeaveEvent } from './useMouseLeaveEvent';
import { useState } from 'react';

export type TUseGridDropAreaEvents = {
  isHovered: boolean;
  onMouseEnter: TUseMouseEnterEvent;
  onMouseLeave: TUseMouseLeaveEvent;
};

export const useGridDropAreaEvents = (
  index: number,
  mouseMode: MouseMode,
  parentId: TElement['parentId'],
): TUseGridDropAreaEvents => {
  const [isHovered, setIsHovered] = useState(false);

  return {
    isHovered,
    onMouseEnter: useMouseEnterEvent(index, mouseMode, parentId, setIsHovered),
    onMouseLeave: useMouseLeaveEvent(mouseMode, setIsHovered),
  };
};
