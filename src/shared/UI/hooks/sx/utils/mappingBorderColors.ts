import { kebabCase } from 'lodash';

// others
import { THEME_COLORS } from 'constant/themeColors';

// types
import { BorderColor } from '../enums/borders';
import { Theme } from 'types';
import { TSXBorders } from '../types/borders';

// utils
import { enumToArray } from 'utils';

export const mappingBorderColors = (
  borderColors: TSXBorders,
  theme: Theme,
): string => {
  const keys = enumToArray<string>(BorderColor);

  return keys
    .map((key) => {
      const color = borderColors[key as keyof TSXBorders];
      return color ? `${kebabCase(key)}: ${THEME_COLORS[theme][color]};` : '';
    })
    .filter(Boolean)
    .join('\n');
};
