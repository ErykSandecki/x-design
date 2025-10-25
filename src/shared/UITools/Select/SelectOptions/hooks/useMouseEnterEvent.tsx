import { MouseEvent } from 'react';

// utils
import { getOptionValue } from '../../utils/getOptionValue';

export type TUseMouseEnterEvent = TFunc<[MouseEvent<HTMLElement>]>;

export const useMouseEnterEvent = (onMouseEnter: TFunc<[string]>): TUseMouseEnterEvent => {
  const handleMouseEnter = (event: MouseEvent<HTMLElement>): void => {
    const value = getOptionValue(event);

    if (onMouseEnter && value !== undefined) {
      onMouseEnter(value);
    }
  };

  return handleMouseEnter;
};
