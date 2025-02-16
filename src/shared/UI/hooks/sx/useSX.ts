import { css } from '@emotion/css';
import { useContext } from 'react';

// core
import { Context } from 'core/ContextProvider/ContextProvider';

// types
import { TSX } from './types/types';

// utils
import { mappingBorders } from './utils/mappingBorders';
import { mappingBorderColors } from './utils/mappingBorderColors';
import { mappingBorderRadius } from './utils/mappingBorderRadius';
import { mappingSpacings } from './utils/mappingSpacings';

export type TUseSX = string;

export const useSX = (sx: TSX): TUseSX => {
  const { theme } = useContext(Context);

  return css`
    ${mappingBorders(sx, theme)}
    ${mappingBorderColors(sx, theme)}
    ${mappingBorderRadius(sx)}
    ${mappingSpacings(sx)}
  `;
};
