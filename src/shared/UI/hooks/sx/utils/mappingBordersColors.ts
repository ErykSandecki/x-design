import { isEmpty, kebabCase, pick } from 'lodash';

// others
import { colors } from 'constant/colors';

// types
import { BorderColor } from '../enums/borders';
import { TSX } from '../types/types';
import { TSXBorders } from '../types/borders';

// utils
import { enumToArray } from 'utils';

export const mappingBordersColors = (sx: TSX): string => {
  const keys = enumToArray<string>(BorderColor);
  const borderColors = pick(sx, keys) as TSXBorders;

  if (isEmpty(borderColors)) {
    return '';
  }

  return keys
    .map((key) => {
      const color = borderColors[key as keyof TSXBorders];
      return `${kebabCase(key)}: ${colors[color]};`;
    })
    .filter(Boolean)
    .join('\n');
};
