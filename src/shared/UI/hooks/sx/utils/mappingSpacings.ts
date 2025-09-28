import { isEmpty, pick } from 'lodash';

// types
import { Spacing } from '../enums/spacings';
import { TSX } from '../types/types';
import { TSXSpacings } from '../types/spacings';

// utils
import { enumToArray } from 'utils';
import { seperateCssProperties } from './utils';

export const mappingSpacings = (sx: TSX): string => {
  const keys = enumToArray<string>(Spacing);
  const spacings = pick(sx, keys) as TSXSpacings;

  if (isEmpty(spacings)) {
    return '';
  }

  return keys
    .map((key) => {
      const value = spacings[key as keyof TSXSpacings];

      if (value !== undefined) {
        const keys = seperateCssProperties(Spacing[key as keyof typeof Spacing]);

        return keys.map((key) => `${key}: ${value}px;`).join('\n');
      }
    })
    .filter(Boolean)
    .join('\n');
};
