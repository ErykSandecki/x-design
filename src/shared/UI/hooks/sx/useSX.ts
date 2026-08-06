import { css } from '@emotion/css';
import { useMemo } from 'react';

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

export const useSX = (deps: Array<any>, sx: TSX): TUseSX =>
  useMemo(
    () => css`
      ${mappingBorders(sx)}
      ${mappingBordersColors(sx)}
      ${mappingBordersRadius(sx)}
      ${mappingDisplay(sx)}
      ${mappingFlex(sx)}
      ${mappingGrid(sx)}
      ${mappingPallete(sx)}
      ${mappingPositions(sx)}
      ${mappingShadows(sx)}
      ${mappingSizing(sx)}
      ${mappingSpacings(sx)}
    `,
    deps,
  );
