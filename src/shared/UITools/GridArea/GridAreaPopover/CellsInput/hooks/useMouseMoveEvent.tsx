import { MouseEvent } from 'react';

// others
import { SEPARATOR } from '../constants';

// types
import { TActiveCell } from '../types';

export type TUseMouseMoveEvent = TFunc<[MouseEvent]>;

export const useMouseMoveEvent = (setActiveCell: TFunc<[TActiveCell]>): TUseMouseMoveEvent => {
  const handleMouseMove = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    const dataValue = target.getAttribute('data-value') as string;

    if (dataValue) {
      const [columns, rows] = dataValue.split(SEPARATOR);
      setActiveCell({ columns: parseInt(columns), rows: parseInt(rows) });
    }
  };

  return handleMouseMove;
};
