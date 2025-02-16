// types
import { Spacing } from '../enums/spacings';
import { TSXSpacings } from '../types/spacings';

// utils
import { enumToArray } from 'utils';
import { seperateCssProperties } from './seperateCssProperties';

export const mappingSpacings = (spacings: TSXSpacings): string => {
  const keys = enumToArray(Spacing);

  return keys
    .map((key) => {
      const value = spacings[key as keyof TSXSpacings];
      const keys = seperateCssProperties(Spacing[key as keyof typeof Spacing]);

      return value ? keys.map((key) => `${key}: ${value}px;`).join('\n') : '';
    })
    .filter(Boolean)
    .join('\n');
};
