import { kebabCase } from 'lodash';

// others
import { THEME_COLORS } from 'constant/themeColors';

// types
import { Border } from '../enums/borders';
import { Theme } from 'types';
import { TSXBorders } from '../types/borders';

// utils
import { enumToArray } from 'utils';

export const getBorderValue = (
  isSubtractive: boolean,
  selectedBorder: string,
  theme: Theme,
  value: number | string,
): string => {
  const targetValue = isSubtractive ? 1 : value;
  const cssValue = `${targetValue}px solid ${THEME_COLORS[theme].neutral3}`;

  if (isSubtractive) {
    const borders = enumToArray<string>(Border).filter(
      (border) => border !== Border.border && border !== selectedBorder,
    );

    return borders
      .map((border) => `${kebabCase(border)}: ${cssValue};`)
      .join('\n');
  }

  return `${kebabCase(selectedBorder)}: ${cssValue};`;
};

export const mappingBorders = (borders: TSXBorders, theme: Theme): string => {
  const keys = enumToArray(Border);

  return keys
    .map((key: string) => {
      const value = borders[key as keyof TSXBorders];
      const isSubtractive =
        (value === 0 || value === '0') && key !== Border.border;

      return value !== undefined
        ? getBorderValue(isSubtractive, key, theme, value)
        : '';
    })
    .filter(Boolean)
    .join('\n');
};
