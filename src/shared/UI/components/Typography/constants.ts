// others
import { COLORS } from 'constant/scss/variables/colors';

// types
import { Theme } from 'types/enums/theme';
import { TTypographyColorsMode } from './types';

export const TYPOGRAPHY_COLORS_MODE: TTypographyColorsMode = {
  link: {
    [Theme.dark]: COLORS.blue1Dark,
    [Theme.light]: COLORS.blue1Light,
  },
  neutral1: {
    [Theme.dark]: COLORS.neutral1Dark,
    [Theme.light]: COLORS.neutral1Light,
  },
  neutral2: {
    [Theme.dark]: COLORS.neutral2Dark,
    [Theme.light]: COLORS.neutral2Light,
  },
  neutral3: {
    [Theme.dark]: COLORS.neutral3Dark,
    [Theme.light]: COLORS.neutral3Light,
  },
  neutral4: {
    [Theme.dark]: COLORS.neutral4Dark,
    [Theme.light]: COLORS.neutral4Light,
  },
  neutral5: {
    [Theme.dark]: COLORS.neutral5Dark,
    [Theme.light]: COLORS.neutral5Light,
  },
} as const;
