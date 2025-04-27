import { RefObject, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useInitializeRef } from './useInitializeRef';
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseEnterEvent } from './useMouseEnterEvent';
import { useMouseLeaveEvent } from './useMouseLeaveEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';
import { useOutsideClickElement } from './useOutsideClickElement';

// others
import { BASE_2D } from 'shared';

// store
import { mainParentIdSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { T2DCoordinates, TElement } from 'types';

export type TUseElementEvents = {
  isMoving: boolean;
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseEnter: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const useElementEvents = (
  alignment: TElement['alignment'],
  coordinates: T2DCoordinates,
  elementRef: RefObject<any>,
  id: TElement['id'],
  isMultiple: boolean,
  isSelected: boolean,
  mouseMode: MouseMode,
  parentId: TElement['parentId'],
  position: TElement['position'],
  type: TElement['type'],
): TUseElementEvents => {
  const mainParentId = useSelector(mainParentIdSelectorCreator(parentId));
  const cursorPosition = useRef(BASE_2D);
  const [isMoving, setIsMoving] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const selectedElement = {
    id,
    parentId,
    position,
    type,
  };

  useInitializeRef(elementRef, id);
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
      alignment,
      coordinates,
      cursorPosition,
      id,
      isMultiple,
      isSelected,
      mainParentId,
      mouseMode,
      selectedElement,
      setIsPressing,
    ),
    onMouseEnter: useMouseEnterEvent(id, isSelected, mouseMode),
    onMouseLeave: useMouseLeaveEvent(mouseMode, parentId),
  };
};
