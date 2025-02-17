import { kebabCase } from 'lodash';

// types
import { TSX } from '../types/types';

export const seperateCssProperties = (value: string): Array<string> =>
  value.split(';');

export const getCssStyles = (sx: TSX, keys: Array<string>): string =>
  keys
    .map((key) => {
      const value = sx[key];
      return value !== undefined ? `${kebabCase(key)}: ${value};` : '';
    })
    .filter(Boolean)
    .join('\n');
