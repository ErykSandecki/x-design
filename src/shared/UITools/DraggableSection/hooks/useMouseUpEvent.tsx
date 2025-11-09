import { isNaN } from 'lodash';
import { useEffect } from 'react';

// others
import { ANCHOR_INDEX } from '../constants';

export type TUseMouseUpEvent = void;

export const useMouseUpEvent = (
  draggableItem: number,
  isDraggable: boolean,
  onDragEnd: TFunc<[number, number]>,
  setDraggableItem: TFunc<[number]>,
  setIsDraggable: TFunc<[boolean]>,
  setIsPressing: TFunc<[boolean]>,
): TUseMouseUpEvent => {
  const handleMouseUp = (event: MouseEvent): void => {
    const position = parseInt((event.target as any).getAttribute(ANCHOR_INDEX) as string);

    if (isDraggable && !isNaN(position)) {
      onDragEnd(draggableItem, position);
      setDraggableItem(position);
    }

    setIsPressing(false);
    setIsDraggable(false);
  };

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);

    return (): void => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggable]);
};
