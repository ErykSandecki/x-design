import { RefObject, useRef, useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';
import { useOutsideClickElement } from './useOutsideClickElement';

// others
import { BASE_2D } from 'shared';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T2DCoordinates, TElement } from 'types';
import { TPageBuilderState, TSelectedElement } from 'store/pageBuilder/types';

export type TUseElementEvents = {
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const useElementEvents = (
  elementRef: RefObject<any>,
  height: TElement['height'],
  id: TSelectedElement['id'],
  isMultiple: boolean,
  isSelected: boolean,
  mouseMode: MouseMode,
  parentId: TSelectedElement['parentId'],
  position: T2DCoordinates,
  type: TSelectedElement['type'],
  width: TElement['width'],
): TUseElementEvents => {
  const cursorPosition = useRef(BASE_2D);
  const prevState = useRef<TPageBuilderState>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const selectedElement = {
    coordinates: {
      x1: position.x,
      x2: position.x + width,
      y1: position.y,
      y2: position.y + height,
    },
    id,
    parentId,
    type,
  };

  useMouseMoveEvent(
    cursorPosition,
    id,
    isMoving,
    isMultiple,
    isPressing,
    mouseMode,
    position,
    prevState,
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
    onMouseDown: useMouseDownEvent(
      cursorPosition,
      isMultiple,
      isSelected,
      mouseMode,
      position,
      prevState,
      selectedElement,
      setIsPressing,
    ),
  };
};
