import { RefObject, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useForceRerender } from 'hooks';
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
  const cursorPositionBase = useRef(BASE_2D);
  const [isPressing, setIsPressing] = useState(false);
  const selectedElement = {
    id,
    parentId,
    position,
    type,
  };

  useForceRerender([coordinates]);
  useInitializeRef(elementRef, id);
  useMouseMoveEvent(
    coordinates,
    cursorPosition,
    cursorPositionBase,
    id,
    isMultiple,
    isPressing,
    mouseMode,
  );
  useMouseUpEvent(isPressing, setIsPressing);
  useOutsideClickElement(elementRef, id, isSelected);

  return {
    onMouseDown: useMouseDownEvent(
      alignment,
      coordinates,
      cursorPosition,
      cursorPositionBase,
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
