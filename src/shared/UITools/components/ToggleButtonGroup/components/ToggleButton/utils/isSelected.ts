import { isArray } from 'lodash';

// types
import { TToggleButtonGroupValue } from '../../../types';

export const isSelected = <V extends TToggleButtonGroupValue>(
  currentValue: V,
  value: string,
): boolean => {
  if (isArray(currentValue)) {
    return currentValue.includes(value);
  }

  return currentValue === value;
};
