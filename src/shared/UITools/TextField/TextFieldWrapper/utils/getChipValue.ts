import { InputHTMLAttributes } from 'react';

// others
import { MIXED } from 'constant/constants';

// types
import { TValueExtended } from 'types';

export const getChipValue = (
  isMixedMode: boolean,
  mode: TValueExtended['mode'],
  value: InputHTMLAttributes<HTMLInputElement>['value'],
): InputHTMLAttributes<HTMLInputElement>['value'] => {
  if (!isMixedMode) {
    switch (mode) {
      case 'auto':
        return 'auto';
      default:
        return value;
    }
  }

  return MIXED;
};
