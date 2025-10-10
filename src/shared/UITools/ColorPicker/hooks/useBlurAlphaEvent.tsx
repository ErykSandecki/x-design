export type TUseBlurAlphaEvent = TFunc;

export const useBlurAlphaEvent = (
  currentAlpha: string,
  currentValue: string,
  onChange: TFunc<[string]>,
  setValue: TFunc<[string]>,
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
