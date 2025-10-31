// others
import { LOCKED, MIXED } from 'constant/constants';

export const getValue = (disabledAll: boolean, hasAlignment: boolean, isMultiple: boolean, value: string): string => {
  if (disabledAll) {
    return LOCKED;
  }

  if (hasAlignment) {
    return isMultiple ? MIXED : 'auto';
  }

  return value;
};
