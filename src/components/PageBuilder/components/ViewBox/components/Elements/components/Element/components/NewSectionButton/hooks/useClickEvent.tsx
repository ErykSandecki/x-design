import { MouseEvent } from 'react';

type TUseClickEvent = (event: MouseEvent<HTMLButtonElement>) => void;

export const useClickEvent = (): TUseClickEvent => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
  };

  return handleClick;
};
