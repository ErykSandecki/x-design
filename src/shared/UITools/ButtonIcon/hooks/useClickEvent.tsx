import { MouseEvent } from 'react';

type TUseClickEvent = TFunc<[MouseEvent]>;

export const useClickEvent = (
  disabledSelection: boolean,
  onClick: TFunc<[MouseEvent]> | undefined,
  selected: boolean,
  setSelected: TFunc<[boolean]>,
): TUseClickEvent => {
  const handleClick = (event: MouseEvent): void => {
    if (onClick) {
      onClick(event);
    }

    if (!disabledSelection) {
      setSelected(!selected);
    }
  };

  return handleClick;
};
