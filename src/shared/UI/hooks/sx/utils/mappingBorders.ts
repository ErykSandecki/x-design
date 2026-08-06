import { isEmpty, kebabCase, pick } from 'lodash';

// others
import { colors } from 'constant/colors';

// types
import { Border } from '../enums/borders';
import { TSX } from '../types/types';
import { TSXBorders } from '../types/borders';

// utils
import { enumToArray } from 'utils';

export const getBorderValue = (isSubtractive: boolean, selectedBorder: string, value: number | string): string => {
  const targetValue = isSubtractive ? 1 : value;
  const cssValue = `${targetValue}px solid ${colors.neutral3}`;

  if (isSubtractive) {
    const borders = enumToArray<string>(Border).filter(
      (border) => border !== Border.border && border !== selectedBorder,
    );

    return borders.map((border) => `${kebabCase(border)}: ${cssValue};`).join('\n');
  }

  return `${kebabCase(selectedBorder)}: ${cssValue};`;
};

export const mappingBorders = (sx: TSX): string => {
  const keys = enumToArray<string>(Border);
  const borders = pick(sx, keys) as TSXBorders;

  if (isEmpty(borders)) {
    return '';
  }

  return keys
    .map((key: string) => {
      const value = borders[key as keyof TSXBorders];
      const isSubtractive = (value === 0 || value === '0') && key !== Border.border;

      return value !== undefined ? getBorderValue(isSubtractive, key, value) : '';
    })
    .filter(Boolean)
    .join('\n');
};
