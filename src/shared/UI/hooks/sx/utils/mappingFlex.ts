// types
import { Flex } from '../enums/flex';
import { TSX } from '../types/types';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingFlex = (sx: TSX): string => {
  const keys = enumToArray<string>(Flex);
  const cssStyles = getCssStyles(sx, keys);

  return cssStyles;
};
