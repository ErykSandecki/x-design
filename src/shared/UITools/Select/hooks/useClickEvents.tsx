import { MouseEvent } from 'react';

// utils
import { getOptionValue } from '../utils/getOptionValue';

export type TUseClickEvents = {
  onClickOption: TFunc<[MouseEvent]>;
  onClickSelect: TFunc<[MouseEvent]>;
};

export const useClickEvents = (onChange: TFunc<[string]>, setSelected: TFunc<[boolean]>): TUseClickEvents => {
  const handleClickOption = (event: MouseEvent<HTMLElement>): void => {
    const value = getOptionValue(event);
    event.stopPropagation();

    if (value !== undefined) {
      setSelected(false);
      onChange(value);
    }
  };

  const handleClickSelect = (): void => {
    setSelected(true);
  };

  return {
    onClickOption: handleClickOption,
    onClickSelect: handleClickSelect,
  };
};
