import { MouseEvent } from 'react';

export type TUseClickEvents = {
  onClickOption: TFunc<[MouseEvent]>;
  onClickSelect: TFunc<[MouseEvent]>;
};

export const useClickEvents = (onChange: TFunc<[string]>, setSelected: TFunc<[boolean]>): TUseClickEvents => {
  const handleClickOption = (event: MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    event.stopPropagation();

    if (target.tagName === 'LI') {
      const targetValue: string = target.getAttribute('data-value') as string;

      setSelected(false);
      onChange(targetValue);
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
