import { ChangeEvent } from 'react';

// utils
import { isHexColor } from 'utils';

export type TUseOnChangeColorEvent = (
  event: ChangeEvent<HTMLInputElement>,
) => void;

export const useOnChangeColorEvent = (
  onChange: (value: string) => void,
  setValue: (value: string) => void,
): TUseOnChangeColorEvent => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    if (isHexColor(value)) {
      onChange(`#${value}`);
    }

    setValue(value);
  };

  return handleChange;
};
