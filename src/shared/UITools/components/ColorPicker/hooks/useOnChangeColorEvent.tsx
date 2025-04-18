import { ChangeEvent } from 'react';

export type TUseOnChangeColorEvent = (
  event: ChangeEvent<HTMLInputElement>,
) => void;

export const useOnChangeColorEvent = (
  setValue: (value: string) => void,
): TUseOnChangeColorEvent => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target as HTMLInputElement;
    setValue(value);
  };

  return handleChange;
};
