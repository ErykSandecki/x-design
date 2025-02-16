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
import { mappingDisplay } from './utils/mappingDisplay';
import { mappingFlex } from './utils/mappingFlex';
import { mappingGrid } from './utils/mappingGrid';
import { mappingPallete } from './utils/mappingPallete';
import { mappingPositions } from './utils/mappingPositions';
import { mappingShadows } from './utils/mappingShadows';
import { mappingSizing } from './utils/mappingSizing';
import { mappingSpacings } from './utils/mappingSpacings';

export type TUseSX = string;

export const useSX = (sx: TSX): TUseSX => {
  const { theme } = useContext(Context);

  return css`
    ${mappingBorders(sx, theme)}
    ${mappingBorderColors(sx, theme)}
    ${mappingBorderRadius(sx)}
    ${mappingDisplay(sx)}
    ${mappingFlex(sx)}
    ${mappingGrid(sx)}
    ${mappingPallete(sx, theme)}
    ${mappingPositions(sx)}
    ${mappingShadows(sx)}
    ${mappingSizing(sx)}
    ${mappingSpacings(sx)}
  `;
};
