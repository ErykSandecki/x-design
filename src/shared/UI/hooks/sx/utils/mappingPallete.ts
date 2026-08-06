import { isEmpty, kebabCase, pick } from 'lodash';

// others
import { colors } from 'constant/colors';

// types
import { Pallete } from '../enums/pallete';
import { TSX } from '../types/types';
import { TSXPallete } from '../types/pallete';

// utils
import { enumToArray } from 'utils';

export const mappingPallete = (sx: TSX): string => {
  const keys = enumToArray<string>(Pallete);
  const pallete = pick(sx, keys) as TSXPallete;

  if (isEmpty(pallete)) {
    return '';
  }

  return keys
    .map((key) => {
      const property = Pallete[key];
      const value = pallete[key as keyof TSXPallete];

      return value ? `${kebabCase(property)}: ${colors[value]};` : '';
    })
    .filter(Boolean)
    .join('\n');
};
