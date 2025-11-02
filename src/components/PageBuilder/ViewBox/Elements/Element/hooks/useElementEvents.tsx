import { CSSProperties, RefObject, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useForceRerender } from 'hooks';
import { useInitializeRef } from './useInitializeRef';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';
import { useOutsideClickElement } from './useOutsideClickElement';

// others
import { BASE_2D } from 'shared';

// store
import {
  elementDataSelectorCreator,
  eventSelectorCreator,
  isDraggableSelectorCreator,
  isHoverSelectorCreator,
  isSelectedElementSelectorCreator,
  multipleSelectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { MouseMode } from 'types/enums/mouseMode';
import { TElement, TInsets } from 'types';
import { TUseElementSizes, useElementSizes } from './useElementSizes';
import { TUseMouseDownEvent, useMouseDownEvent } from './useMouseDownEvent';
import { TUseMouseEnterEvent, useMouseEnterEvent } from './useMouseEnterEvent';
import { TUseMouseLeaveEvent, useMouseLeaveEvent } from './useMouseLeaveEvent';

export type TUseElementEvents = TUseElementSizes & {
  alignment: TElement['alignment'];
  angle: TElement['angle'];
  background: TElement['background'];
  coordinates: TElement['coordinates'];
  displayEventsArea: boolean;
  displayOutline: boolean;
  flip: TElement['flip'];
  isHover: boolean;
  isMoving: boolean;
  isSelected: boolean;
  layout: TElement['layout'];
  margin: TInsets;
  onMouseDown: TUseMouseDownEvent;
  onMouseEnter: TUseMouseEnterEvent;
  onMouseLeave: TUseMouseLeaveEvent;
  overflow: CSSProperties['overflow'];
  padding: TInsets;
  position: TElement['position'];
  showDropAnchors: boolean;
  visible: boolean;
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
  const elementData = useSelector(elementDataSelectorCreator(id));
  const cursorPosition = useRef(BASE_2D);
  const cursorPositionBase = useRef(BASE_2D);
  const isSelected = useSelector(isSelectedElementSelectorCreator(id));
  const isDraggable = useSelector(isDraggableSelectorCreator(id));
  const isHover = useSelector(isHoverSelectorCreator(id));
  const isMultiple = useSelector(multipleSelectedElementsSelector);
  const isFocused = (isHover || isSelected) && mouseMode === MouseMode.default;
  const isMultipleMoving = useSelector(eventSelectorCreator('isMultipleMoving'));
  const isMoving = isDraggable || (isMultipleMoving && isSelected);
  const displayEventsArea = !isDraggable && !isMultiple && isSelected;
  const displayOutline = isFocused;
  const [isPressing, setIsPressing] = useState(false);
  const { coordinates, position } = elementData;
  const { x, y } = coordinates;
  const sizes = useElementSizes(id);
  const showDropAnchors = !isSelected && position === 'relative';
  const overflow: CSSProperties['overflow'] = elementData.clipContent ? 'hidden' : 'visible';

  useForceRerender([coordinates]);
  useInitializeRef(elementRef, id);
  useMouseMoveEvent(cursorPosition, cursorPositionBase, id, isPressing, mouseMode, parentId, type);
  useMouseUpEvent(isPressing, setIsPressing);
  useOutsideClickElement(elementRef, id, isSelected);

  return {
    ...sizes,
    alignment: elementData.alignment,
    angle: elementData.angle,
    background: elementData.background,
    coordinates,
    displayEventsArea,
    displayOutline,
    flip: elementData.flip,
    isHover,
    isMoving,
    isSelected,
    layout: elementData.layout,
    margin: elementData.margin,
    onMouseDown: useMouseDownEvent(
      cursorPosition,
      cursorPositionBase,
      isMultiple,
      isSelected,
      mouseMode,
      {
        id,
        parentId,
        position,
        type,
      },
      setIsPressing,
    ),
    onMouseEnter: useMouseEnterEvent(id, isSelected, mouseMode),
    onMouseLeave: useMouseLeaveEvent(mouseMode, parentId),
    overflow,
    padding: elementData.padding,
    position,
    showDropAnchors,
    visible: elementData.visible,
    x,
    y,
  };
};
