// others
import { THEME_COLORS } from 'constant/themeColors';

// types
import { Theme } from 'types';
import { TSXBorders } from './borders';
import { TSXSpacings } from './spacings';

export type TSXColor = keyof (typeof THEME_COLORS)[Theme];

export type TSX = TSXBorders & TSXSpacings;
