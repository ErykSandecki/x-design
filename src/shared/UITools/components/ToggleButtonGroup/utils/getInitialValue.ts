// types
import { TToggleButtonGroupValue } from '../types';

export const getInitialValue = <V extends TToggleButtonGroupValue>(multiple: boolean, defaultValue?: null | V): V => {
  if (defaultValue !== null) {
    return defaultValue as V;
  }

  return multiple ? ([] as V) : ('' as V);
};
