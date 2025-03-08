import { RefObject, useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';
import { useOutsideClickElement } from './useOutsideClickElement';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T2DCoordinates } from 'types';
import { TSelectedElement } from 'store/pageBuilder/types';

export type TUseElementEvents = {
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const useElementEvents = (
  elementRef: RefObject<any>,
  id: TSelectedElement['id'],
  isSelected,
  mouseMode: MouseMode,
  parentId: TSelectedElement['parentId'],
  position: T2DCoordinates,
  type: TSelectedElement['type'],
): TUseElementEvents => {
  const [isPressing, setIsPressing] = useState(false);
  const selectedElement = {
    coordinates: position,
    id,
    parentId,
    type,
  };

  useMouseMoveEvent(isPressing, mouseMode, position);
  useMouseUpEvent(isPressing, setIsPressing);
  useOutsideClickElement(elementRef, id, isSelected);

  return {
    onMouseDown: useMouseDownEvent(
      isSelected,
      mouseMode,
      selectedElement,
      setIsPressing,
    ),
  };
};
