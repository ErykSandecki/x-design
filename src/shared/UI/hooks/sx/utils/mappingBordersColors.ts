import { isEmpty, kebabCase, pick } from 'lodash';

// others
import { THEME_COLORS } from 'constant/themeColors';

// types
import { BorderColor } from '../enums/borders';
import { Theme } from 'types';
import { TSX } from '../types/types';
import { TSXBorders } from '../types/borders';

// utils
import { enumToArray } from 'utils';

export const mappingBordersColors = (sx: TSX, theme: Theme): string => {
  const keys = enumToArray<string>(BorderColor);
  const borderColors = pick(sx, keys) as TSXBorders;

  if (isEmpty(borderColors)) {
    return '';
  }

  return keys
    .map((key) => {
      const color = borderColors[key as keyof TSXBorders];
      return `${kebabCase(key)}: ${THEME_COLORS[theme][color]};`;
    })
    .filter(Boolean)
    .join('\n');
};
