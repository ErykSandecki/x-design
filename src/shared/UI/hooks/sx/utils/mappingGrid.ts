// types
import { Grid } from '../enums/grid';
import { TSX } from '../types/types';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingGrid = (sx: TSX): string => {
  const keys = enumToArray<string>(Grid);
  const cssStyles = getCssStyles(sx, keys);

  return cssStyles;
};
