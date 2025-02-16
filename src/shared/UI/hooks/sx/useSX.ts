import { css } from '@emotion/css';

// types
import { TSX } from './types/types';

// utils
import { mappingSpacings } from './utils/mappingSpacings';

export type TUseSX = string;

export const useSX = (sx: TSX): TUseSX => {
  return css`
    ${mappingSpacings(sx.spacings || {})}
  `;
};
