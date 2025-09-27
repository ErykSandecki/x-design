import { ChangeEvent } from 'react';

export type TUseChangeAlphaEvent = (event: ChangeEvent<HTMLInputElement>) => void;

export const useChangeAlphaEvent = (setValue: (value: string) => void): TUseChangeAlphaEvent => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target as HTMLInputElement;
    setValue(value);
  };

  return handleChange;
};
