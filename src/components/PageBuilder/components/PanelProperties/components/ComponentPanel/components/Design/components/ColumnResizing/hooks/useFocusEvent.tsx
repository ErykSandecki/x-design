// types
import { TFocusElement } from '../types';

export type TUseFocusEvent = TFuncion<[TFocusElement]>;

export const useFocusEvent = (setIsFocused: TFuncion<[TFocusElement]>): TUseFocusEvent => {
  const handleFocus = (sizeType): void => {
    setIsFocused(sizeType);
  };

  return handleFocus;
};
