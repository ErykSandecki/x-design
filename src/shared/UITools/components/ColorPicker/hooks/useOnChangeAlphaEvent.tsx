import { ChangeEvent } from 'react';

export type TUseOnChangeAlphaEvent = (
  event: ChangeEvent<HTMLInputElement>,
) => void;

export const useOnChangeAlphaEvent = (
  onChange: (value: string) => void,
  setValue: (value: string) => void,
): TUseOnChangeAlphaEvent => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target as HTMLInputElement;

    if (value) {
      onChange(value);
    }

    setValue(value);
  };

  return handleChange;
};
