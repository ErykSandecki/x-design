// types
import { CODE_KEY } from '../constants';

export const mapSecondaryKey = (key: string): string => {
  if (key.includes(CODE_KEY)) {
    return key.replace(CODE_KEY, '');
  }

  return key;
};
