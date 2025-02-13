// others
import { COLORS } from 'constant/scss/variables/colors';

// types
import { Theme } from 'types/enums/theme';
import { TTypographyProps } from './Typography';
import { TValueObj } from 'types/generic';

export type TTypographyColorMode = {
  [Theme.dark]: TValueObj<
    Pick<
      typeof COLORS,
      | 'blue1Dark'
      | 'neutral1Dark'
      | 'neutral2Dark'
      | 'neutral3Dark'
      | 'neutral4Dark'
      | 'neutral5Dark'
    >
  >;
  [Theme.light]: TValueObj<
    Pick<
      typeof COLORS,
      | 'blue1Light'
      | 'neutral1Light'
      | 'neutral2Light'
      | 'neutral3Light'
      | 'neutral4Light'
      | 'neutral5Light'
    >
  >;
};

export type TTypographyColorsMode = {
  link: TTypographyColorMode;
  neutral1: TTypographyColorMode;
  neutral2: TTypographyColorMode;
  neutral3: TTypographyColorMode;
  neutral4: TTypographyColorMode;
  neutral5: TTypographyColorMode;
};

export type TTypographyColor = TTypographyColorMode | string;
export type TOmittedTypographyProps = Omit<TTypographyProps, 'fontType'>;
