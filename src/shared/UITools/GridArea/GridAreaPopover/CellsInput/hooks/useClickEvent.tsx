import { MouseEvent } from 'react';

// core
import { usePopoverRoot } from '../../../../Popover/PopoverRoot/core/PopoverRootProvider';

// others
import { SEPARATOR } from '../constants';

// types
import { TActiveCell } from '../types';

export type TUseClickEvent = TFunc<[MouseEvent]>;

export const useClickEvent = (onClick: TFunc<[TActiveCell]>): TUseClickEvent => {
  const { setSelected } = usePopoverRoot();

  const handleClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    const dataValue = target.getAttribute('data-value') as string;

    if (dataValue) {
      const [columns, rows] = dataValue.split(SEPARATOR);

      onClick({ columns: parseInt(columns), rows: parseInt(rows) });
      setSelected(false);
    }
  };

  return handleClick;
};
