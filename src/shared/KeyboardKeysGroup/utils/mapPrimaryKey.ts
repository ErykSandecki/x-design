// others
import { ALT, CONTROL, SHIFT } from 'constant/mainKeys';

// types
import { TPrimaryKey } from 'hooks';

export const mapPrimaryKey = (key: TPrimaryKey): string => {
  switch (key) {
    case 'alt':
      return ALT;
    case 'control':
    case 'meta':
      return CONTROL;
    default:
      return SHIFT;
  }
};
