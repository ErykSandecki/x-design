import { noop } from 'lodash';
import { RefObject, useState } from 'react';

// hooks
import { useMouseUpEvent } from './useMouseUpEvent';
import { useOutsideClick } from 'hooks';

// types
import { TUseMouseDownEvent, useMouseDownEvent } from './useMouseDownEvent';

export type TUseDraggableSectionEvents = {
  draggableItem: number;
  isDraggable: boolean;
  isPressing: boolean;
  onMouseDown: TUseMouseDownEvent;
  selected: boolean;
  setIsDraggable: TFunc<[boolean]>;
};

export const useDraggableSectionEvents = (
  containerId: string,
  onDragEnd: TFunc<[number, number]>,
  ref: RefObject<HTMLDivElement>,
): TUseDraggableSectionEvents => {
  const { selected, setSelected } = useOutsideClick([], ref, noop, containerId);
  const [draggableItem, setDraggableItem] = useState(-1);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const onMouseDown = useMouseDownEvent(setDraggableItem, setIsPressing, setSelected);

  useMouseUpEvent(draggableItem, isDraggable, onDragEnd, setDraggableItem, setIsDraggable, setIsPressing);

  return { draggableItem, isDraggable, isPressing, onMouseDown, selected, setIsDraggable };
};
