import { kebabCase } from 'lodash';

// others
import { THEME_COLORS } from 'constant/themeColors';

// types
import { Pallete } from '../enums/pallete';
import { Theme } from 'types';
import { TSXPallete } from '../types/pallete';

// utils
import { enumToArray } from 'utils';

export const mappingPallete = (pallete: TSXPallete, theme: Theme): string => {
  const keys = enumToArray<string>(Pallete);

  return keys
    .map((key) => {
      const property = Pallete[key];
      const value = pallete[key as keyof TSXPallete];

      return value
        ? `${kebabCase(property)}: ${THEME_COLORS[theme][value]};`
        : '';
    })
    .filter(Boolean)
    .join('\n');
};
