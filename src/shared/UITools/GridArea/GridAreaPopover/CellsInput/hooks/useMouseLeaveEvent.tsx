// types
import { TActiveCell } from '../types';

export type TUseMouseLeaveEvent = TFunc;

export const useMouseLeaveEvent = (setActiveCell: TFunc<[TActiveCell]>): TUseMouseLeaveEvent => {
  const handleMouseLeave = (): void => {
    setActiveCell({ columns: 0, rows: 0 });
  };

  return handleMouseLeave;
};
