export type TUseOnBlurAlphaEvent = () => void;

export const useOnBlurAlphaEvent = (
  currentValue: string,
  setValue: (value: string) => void,
): TUseOnBlurAlphaEvent => {
  const handleBlur = (): void => {
    setValue(currentValue);
  };

  return handleBlur;
};
