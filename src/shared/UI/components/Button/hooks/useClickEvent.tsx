import { ButtonHTMLAttributes, MouseEvent } from 'react';

type TUseClickEvent = (event: MouseEvent<HTMLButtonElement>) => void;

export const useClickEvent = (
  disabledRippleEffect: boolean,
  onClick: ButtonHTMLAttributes<HTMLElement>['onClick'],
  triggerRippleEffect: (event: MouseEvent<HTMLElement>) => void,
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
