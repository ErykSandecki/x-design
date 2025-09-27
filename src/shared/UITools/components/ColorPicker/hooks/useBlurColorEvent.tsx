// utils
import { isHexColor } from 'utils';

export type TUseBlurColorEvent = () => void;

export const useBlurColorEvent = (
  alpha: string,
  currentColor: string,
  currentValue: string,
  onChange: TFunc<[string, string]>,
  setValue: TFunc<[string]>,
): TUseBlurColorEvent => {
  const handleBlur = (): void => {
    if (isHexColor(currentValue)) {
      onChange(alpha, `#${currentValue}`);
    } else {
      setValue(currentColor);
    }
  };

  return handleBlur;
};
