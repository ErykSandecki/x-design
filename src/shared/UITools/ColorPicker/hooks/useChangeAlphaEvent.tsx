import { ChangeEvent } from 'react';

export type TUseChangeAlphaEvent = TFunc<[ChangeEvent<HTMLInputElement>]>;

export const useChangeAlphaEvent = (setValue: TFunc<[string]>): TUseChangeAlphaEvent => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target as HTMLInputElement;
    setValue(value);
  };

  return handleChange;
};
