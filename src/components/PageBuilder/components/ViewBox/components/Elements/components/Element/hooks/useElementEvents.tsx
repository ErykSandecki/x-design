import { RefObject, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useElementSizes } from './useElementSizes';
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
import {
  counterAngleSelectorCreator,
  elementDynamicDataSelectorCreator,
  eventSelectorCreator,
  isDraggableSelectorCreator,
  isHoverSelectorCreator,
  isSelectedElementSelectorCreator,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { TElement } from 'types';

export type TUseElementEvents = {
  alignment: TElement['alignment'];
  angle: TElement['angle'];
  background: TElement['background'];
  coordinates: TElement['coordinates'];
  counterAngle: number;
  cssHeight: TElement['height'];
  cssWidth: TElement['height'];
  displayEventsArea: boolean;
  displayOutline: boolean;
  height: TElement['height'];
  isHover: boolean;
  isMoving: boolean;
  isSelected: boolean;
  layout: TElement['layout'];
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseEnter: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  position: TElement['position'];
  width: TElement['width'];
  x: TElement['coordinates']['x'];
  y: TElement['coordinates']['y'];
};

export const useElementEvents = (
  elementRef: RefObject<any>,
  id: TElement['id'],
  mouseMode: MouseMode,
  parentId: TElement['parentId'],
  type: TElement['type'],
): TUseElementEvents => {
  const elementDynamicData = useSelector(elementDynamicDataSelectorCreator(id));
  const counterAngle = useSelector(counterAngleSelectorCreator(parentId));
  const cursorPosition = useRef(BASE_2D);
  const cursorPositionBase = useRef(BASE_2D);
  const isSelected = useSelector(isSelectedElementSelectorCreator(id));
  const isDraggable = useSelector(isDraggableSelectorCreator(id));
  const isHover = useSelector(isHoverSelectorCreator(id));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const isFocused = isHover || isSelected;
  const isMultipleMoving = useSelector(
    eventSelectorCreator('isMultipleMoving'),
  );
  const isMoving = isDraggable || (isMultipleMoving && isSelected);
  const displayEventsArea = !isDraggable && !isMultiple && isSelected;
  const displayOutline = isFocused;
  const [isPressing, setIsPressing] = useState(false);
  const { alignment, angle, background, coordinates, layout, position } =
    elementDynamicData;
  const { x, y } = coordinates;
  const selectedElement = {
    id,
    parentId,
    position,
    type,
  };
  const sizes = useElementSizes(id);

  useForceRerender([coordinates]);
  useInitializeRef(elementRef, id);
  useMouseMoveEvent(
    cursorPosition,
    cursorPositionBase,
    id,
    isPressing,
    mouseMode,
    parentId,
  );
  useMouseUpEvent(isPressing, setIsPressing);
  useOutsideClickElement(elementRef, id, isSelected);

  return {
    ...sizes,
    alignment,
    angle,
    background,
    coordinates,
    counterAngle,
    displayEventsArea,
    displayOutline,
    isHover,
    isMoving,
    isSelected,
    layout,
    onMouseDown: useMouseDownEvent(
      cursorPosition,
      cursorPositionBase,
      isMultiple,
      isSelected,
      mouseMode,
      selectedElement,
      setIsPressing,
    ),
    onMouseEnter: useMouseEnterEvent(id, isSelected, mouseMode),
    onMouseLeave: useMouseLeaveEvent(mouseMode, parentId),
    position,
    x,
    y,
  };
};
