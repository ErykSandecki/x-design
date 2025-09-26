import { css } from '@emotion/css';
import { useContext, useMemo } from 'react';

// core
import { Context } from 'core';

// types
import { TSX } from './types/types';

// utils
import { mappingBorders } from './utils/mappingBorders';
import { mappingBordersColors } from './utils/mappingBordersColors';
import { mappingBordersRadius } from './utils/mappingBordersRadius';
import { mappingDisplay } from './utils/mappingDisplay';
import { mappingFlex } from './utils/mappingFlex';
import { mappingGrid } from './utils/mappingGrid';
import { mappingPallete } from './utils/mappingPallete';
import { mappingPositions } from './utils/mappingPositions';
import { mappingShadows } from './utils/mappingShadows';
import { mappingSizing } from './utils/mappingSizing';
import { mappingSpacings } from './utils/mappingSpacings';

export type TUseSX = string;

export const useSX = (deps: Array<TSX>, sx: TSX): TUseSX => {
  const { theme } = useContext(Context);

  return useMemo(
    () => css`
      ${mappingBorders(sx, theme)}
      ${mappingBordersColors(sx, theme)}
      ${mappingBordersRadius(sx)}
      ${mappingDisplay(sx)}
      ${mappingFlex(sx)}
      ${mappingGrid(sx)}
      ${mappingPallete(sx, theme)}
      ${mappingPositions(sx)}
      ${mappingShadows(sx)}
      ${mappingSizing(sx)}
      ${mappingSpacings(sx)}
    `,
    [...deps, theme],
  );
};
