// others
import { THEME_COLORS } from 'constant/themeColors';

// types
import { Theme } from 'types';
import { TSXBorders } from './borders';
import { TSXDisplay } from './display';
import { TSXFlex } from './flex';
import { TSXGrid } from './grid';
import { TSXPallete } from './pallete';
import { TSXPositions } from './positions';
import { TSXShadows } from './shadows';
import { TSXSizing } from './sizing';
import { TSXSpacings } from './spacings';

export type TSXColor = keyof (typeof THEME_COLORS)[Theme];

export type TSX = TSXBorders &
  TSXDisplay &
  TSXFlex &
  TSXGrid &
  TSXPallete &
  TSXPositions &
  TSXShadows &
  TSXSizing &
  TSXSpacings;
