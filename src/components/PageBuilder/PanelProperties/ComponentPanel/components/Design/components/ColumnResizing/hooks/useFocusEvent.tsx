// types
import { TFocusElement } from '../types';

export type TUseFocusEvent = TFunc<[TFocusElement]>;

export const useFocusEvent = (setIsFocused: TFunc<[TFocusElement]>): TUseFocusEvent => {
  const handleFocus = (sizeType): void => {
    setIsFocused(sizeType);
  };

  return handleFocus;
};
