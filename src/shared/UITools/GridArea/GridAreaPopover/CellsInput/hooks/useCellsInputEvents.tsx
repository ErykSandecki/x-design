import { MouseEvent, useState } from 'react';

// hooks
import { useClickEvent } from './useClickEvent';
import { useMouseLeaveEvent } from './useMouseLeaveEvent';
import { useMouseMoveEvent } from './useMouseMoveEvent';

// types
import { TActiveCell } from '../types';

export type TUseCellsInputEvents = {
  activeCell: TActiveCell;
  onClick: TFunc<[MouseEvent]>;
  onMouseLeave: TFunc;
  onMouseMove: TFunc<[MouseEvent]>;
};

export const useCellsInputEvents = (onClickCell: TFunc<[TActiveCell]>): TUseCellsInputEvents => {
  const [activeCell, setActiveCell] = useState({ columns: 0, rows: 0 });
  const onClick = useClickEvent(onClickCell);
  const onMouseLeave = useMouseLeaveEvent(setActiveCell);
  const onMouseMove = useMouseMoveEvent(setActiveCell);

  return {
    activeCell,
    onClick,
    onMouseLeave,
    onMouseMove,
  };
};
