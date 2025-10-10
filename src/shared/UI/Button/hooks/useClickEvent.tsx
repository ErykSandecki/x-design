import { ButtonHTMLAttributes, MouseEvent } from 'react';

type TUseClickEvent = TFunc<[MouseEvent<HTMLButtonElement>]>;

export const useClickEvent = (
  disabledRippleEffect: boolean,
  onClick: ButtonHTMLAttributes<HTMLElement>['onClick'],
  triggerRippleEffect: TFunc<[MouseEvent<HTMLElement>]>,
): TUseClickEvent => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    if (!disabledRippleEffect) {
      triggerRippleEffect(event);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return handleClick;
};
