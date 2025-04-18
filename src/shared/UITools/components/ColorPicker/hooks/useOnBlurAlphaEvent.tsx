export type TUseOnBlurAlphaEvent = () => void;

export const useOnBlurAlphaEvent = (
  currentAlpha: string,
  currentValue: string,
  onChange: (value: string) => void,
  setValue: (value: string) => void,
): TUseOnBlurAlphaEvent => {
  const handleBlur = (): void => {
    if (currentValue) {
      onChange(currentValue);
    } else {
      setValue(currentAlpha);
    }
  };

  return handleBlur;
};
