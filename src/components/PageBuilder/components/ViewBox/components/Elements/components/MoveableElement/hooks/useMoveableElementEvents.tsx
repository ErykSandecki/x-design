import { useState } from 'react';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T2DCoordinates } from 'types';
import { TSelectedElement } from 'store/pageBuilder/types';

export type TUseMoveableElementEvents = {
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const useMoveableElementEvents = (
  coordinates: TSelectedElement['coordinates'],
  id: TSelectedElement['id'],
  mouseMode: MouseMode,
  parentId: TSelectedElement['parentId'],
  position: T2DCoordinates,
  type: TSelectedElement['type'],
): TUseMoveableElementEvents => {
  const [isPressing, setIsPressing] = useState(false);
  const selectedElement = {
    coordinates,
    id,
    parentId,
    type,
  };

  useMouseMoveEvent(isPressing, mouseMode, position);
  useMouseUpEvent(isPressing, setIsPressing);

  return {
    onMouseDown: useMouseDownEvent(mouseMode, selectedElement, setIsPressing),
  };
};
