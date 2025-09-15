import { isEmpty, kebabCase, pick } from 'lodash';

// types
import { TSX } from '../types/types';

export const seperateCssProperties = (value: string): Array<string> =>
  value.split(';');

export const getCssStyles = (sx: TSX, keys: Array<string>): string => {
  const partialSX = pick(sx, keys) as Partial<TSX>;

  if (isEmpty(partialSX)) {
    return '';
  }

  return keys
    .map((key) => {
      const value = sx[key];
      return value !== undefined ? `${kebabCase(key)}: ${value};` : '';
    })
    .filter(Boolean)
    .join('\n');
};
