import { isEmpty, kebabCase, pick } from 'lodash';

// others
import { THEME_COLORS } from 'constant/themeColors';

// types
import { Pallete } from '../enums/pallete';
import { Theme } from 'types';
import { TSX } from '../types/types';
import { TSXPallete } from '../types/pallete';

// utils
import { enumToArray } from 'utils';

export const mappingPallete = (sx: TSX, theme: Theme): string => {
  const keys = enumToArray<string>(Pallete);
  const pallete = pick(sx, keys) as TSXPallete;

  if (isEmpty(pallete)) {
    return '';
  }

  return keys
    .map((key) => {
      const property = Pallete[key];
      const value = pallete[key as keyof TSXPallete];

      return value ? `${kebabCase(property)}: ${THEME_COLORS[theme][value]};` : '';
    })
    .filter(Boolean)
    .join('\n');
};
