import { ButtonHTMLAttributes, MouseEvent } from 'react';

type TUseClickEvent = TFunc<[MouseEvent<HTMLButtonElement>]>;

export const useClickEvent = (
  onClick: ButtonHTMLAttributes<HTMLElement>['onClick'] | undefined,
  selected: boolean,
  setSelected: TFunc<[boolean]>,
): TUseClickEvent => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if (onClick) {
      onClick(event);
    }

    setSelected(!selected);
  };

  return handleClick;
};
