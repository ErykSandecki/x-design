import { RefObject, useRef, useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseEnterEvent } from './useMouseEnterEvent';
import { useMouseLeaveEvent } from './useMouseLeaveEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';
import { useOutsideClickElement } from './useOutsideClickElement';

// others
import { BASE_2D } from 'shared';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T2DCoordinates, TElement } from 'types';
import { TSelectedElement } from 'store/pageBuilder/types';

export type TUseElementEvents = {
  isMoving: boolean;
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseEnter: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const useElementEvents = (
  coordinates: T2DCoordinates,
  elementRef: RefObject<any>,
  height: TElement['height'],
  id: TSelectedElement['id'],
  isMultiple: boolean,
  isSelected: boolean,
  mouseMode: MouseMode,
  parentId: TSelectedElement['parentId'],
  type: TSelectedElement['type'],
  width: TElement['width'],
): TUseElementEvents => {
  const cursorPosition = useRef(BASE_2D);
  const [isMoving, setIsMoving] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const selectedElement = {
    coordinates: {
      x1: coordinates.x,
      x2: coordinates.x + (width as number),
      y1: coordinates.y,
      y2: coordinates.y + (height as number),
    },
    id,
    parentId,
    type,
  };

  useMouseMoveEvent(
    coordinates,
    cursorPosition,
    id,
    isMoving,
    isMultiple,
    isPressing,
    mouseMode,
    setIsMoving,
  );
  useMouseUpEvent(
    isMoving,
    isMultiple,
    isPressing,
    isSelected,
    selectedElement,
    setIsMoving,
    setIsPressing,
  );
  useOutsideClickElement(elementRef, id, isSelected);

  return {
    isMoving,
    onMouseDown: useMouseDownEvent(
      coordinates,
      cursorPosition,
      isMultiple,
      isSelected,
      mouseMode,
      selectedElement,
      setIsPressing,
    ),
    onMouseEnter: useMouseEnterEvent(id, isSelected, mouseMode),
    onMouseLeave: useMouseLeaveEvent(mouseMode, parentId),
  };
};
