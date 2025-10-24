import { MouseEvent } from 'react';

type TUseClickEvent = TFunc<[MouseEvent]>;

export const useClickEvent = (
  onClick: TFunc<[MouseEvent]> | undefined,
  selected: boolean,
  setSelected: TFunc<[boolean]>,
): TUseClickEvent => {
  const handleClick = (event: MouseEvent): void => {
    if (onClick) {
      onClick(event);
    }

    setSelected(!selected);
  };

  return handleClick;
};
