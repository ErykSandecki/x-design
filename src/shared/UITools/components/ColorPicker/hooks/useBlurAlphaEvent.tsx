export type TUseBlurAlphaEvent = () => void;

export const useBlurAlphaEvent = (
  currentAlpha: string,
  currentValue: string,
  onChange: (value: string) => void,
  setValue: (value: string) => void,
): TUseBlurAlphaEvent => {
  const handleBlur = (): void => {
    if (currentValue) {
      onChange(currentValue);
    } else {
      setValue(currentAlpha);
    }
  };

  return handleBlur;
};
