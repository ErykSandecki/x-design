// types
import { Grid } from '../enums/grid';
import { TSXGrid } from '../types/grid';

// utils
import { enumToArray } from 'utils';
import { getCssStyles } from './utils';

export const mappingGrid = (grid: TSXGrid): string => {
  const keys = enumToArray<string>(Grid);
  const cssStyles = getCssStyles(grid, keys);
  const hasGridStyle = cssStyles.length;

  return hasGridStyle ? `display: grid;\n${cssStyles}` : cssStyles;
};
