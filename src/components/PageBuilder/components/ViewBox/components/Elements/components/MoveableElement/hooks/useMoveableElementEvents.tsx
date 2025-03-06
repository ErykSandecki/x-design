import { RefObject, useState } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useMouseDownEvent } from './useMouseDownEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';
import { useMouseUpEvent } from './useMouseUpEvent';
import { useOutsideClickElement } from './useOutsideClickElement';

// store
import { isSelectedElementSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T2DCoordinates } from 'types';
import { TSelectedElement } from 'store/pageBuilder/types';

export type TUseMoveableElementEvents = {
  onMouseDown: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  selected: boolean;
};

export const useMoveableElementEvents = (
  elementRef: RefObject<any>,
  id: TSelectedElement['id'],
  mouseMode: MouseMode,
  parentId: TSelectedElement['parentId'],
  position: T2DCoordinates,
  type: TSelectedElement['type'],
): TUseMoveableElementEvents => {
  const [isPressing, setIsPressing] = useState(false);
  const isSelected = useSelector(isSelectedElementSelectorCreator(id));
  const { selected, setSelected } = useOutsideClickElement(
    elementRef,
    id,
    isSelected,
  );
  const selectedElement = {
    coordinates: position,
    id,
    parentId,
    type,
  };

  useMouseMoveEvent(isPressing, mouseMode, position);
  useMouseUpEvent(isPressing, setIsPressing);

  return {
    onMouseDown: useMouseDownEvent(
      isSelected,
      mouseMode,
      selectedElement,
      setIsPressing,
      setSelected,
    ),
    selected,
  };
};
