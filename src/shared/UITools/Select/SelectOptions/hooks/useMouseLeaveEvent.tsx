import { MouseEvent } from 'react';

// utils
import { getOptionValue } from '../../utils/getOptionValue';

export type TUseMouseLeaveEvent = TFunc<[MouseEvent<HTMLElement>]>;

export const useMouseLeaveEvent = (onMouseLeave: TFunc<[string]>): TUseMouseLeaveEvent => {
  const handleMouseLeave = (event: MouseEvent<HTMLElement>): void => {
    const value = getOptionValue(event);

    if (onMouseLeave && value !== undefined) {
      onMouseLeave(value);
    }
  };

  return handleMouseLeave;
};
