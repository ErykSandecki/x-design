import { InputHTMLAttributes } from 'react';

// types
import { TValueExtended } from 'types';

export const getValue = (
  mode: TValueExtended['mode'],
  value: InputHTMLAttributes<HTMLInputElement>['value'],
): InputHTMLAttributes<HTMLInputElement>['value'] => {
  switch (mode) {
    case 'auto':
      return 'auto';
    default:
      return value;
  }
};
