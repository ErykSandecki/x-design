import { ChangeEvent } from 'react';

export type TUseOnChangeAlphaEvent = (
  event: ChangeEvent<HTMLInputElement>,
) => void;

export const useOnChangeAlphaEvent = (
  setValue: (value: string) => void,
): TUseOnChangeAlphaEvent => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target as HTMLInputElement;
    setValue(value);
  };

  return handleChange;
};
