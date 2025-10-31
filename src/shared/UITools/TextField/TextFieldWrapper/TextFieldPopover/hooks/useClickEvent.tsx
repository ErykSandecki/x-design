import { MouseEvent } from 'react';

// utils
import { stopPropagation } from 'utils';

type TUseClickEvent = TFunc<[MouseEvent<HTMLDivElement>]>;

export const useClickEvent = (onClick: TFunc): TUseClickEvent => {
  const handleClick = (event: MouseEvent<HTMLDivElement>): void => {
    onClick();
    stopPropagation(event);
  };

  return handleClick;
};
