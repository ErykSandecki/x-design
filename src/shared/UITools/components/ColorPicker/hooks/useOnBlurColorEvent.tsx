import { isHexColor } from 'utils';

export type TUseOnBlurColorEvent = () => void;

export const useOnBlurColorEvent = (
  alpha: string,
  currentColor: string,
  currentValue: string,
  onChange: (alpha: string, value: string) => void,
  setValue: (value: string) => void,
): TUseOnBlurColorEvent => {
  const handleBlur = () => {
    if (isHexColor(currentValue)) {
      onChange(alpha, `#${currentValue}`);
    } else {
      setValue(currentColor);
    }
  };

  return handleBlur;
};
