import { ChangeEvent } from 'react';

export type TUseChangeColorEvent = (
  event: ChangeEvent<HTMLInputElement>,
) => void;

export const useChangeColorEvent = (
  setValue: (value: string) => void,
): TUseChangeColorEvent => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target as HTMLInputElement;
    setValue(value);
  };

  return handleChange;
};
