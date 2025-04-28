// utils
import { isHexColor } from 'utils';

export type TUseBlurColorEvent = () => void;

export const useBlurColorEvent = (
  alpha: string,
  currentColor: string,
  currentValue: string,
  onChange: (alpha: string, value: string) => void,
  setValue: (value: string) => void,
): TUseBlurColorEvent => {
  const handleBlur = () => {
    if (isHexColor(currentValue)) {
      onChange(alpha, `#${currentValue}`);
    } else {
      setValue(currentColor);
    }
  };

  return handleBlur;
};
