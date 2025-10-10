import { values } from 'lodash';

// types
import { ColorsTheme } from 'types/enums/scss/colorsTheme';
import { TypographyFontStyle, TypographyFontWeight, TypographyVariant } from './enums';

// utils
import { composeClassNames } from 'utils';

export const className = 'Typography';

export const classes = {
  className,
};

export const classNames = composeClassNames(className, [
  className,
  'gutterBottom',
  'noWrap',
  ...values(ColorsTheme),
  ...values(TypographyVariant),
  ...values(TypographyFontStyle),
  ...values(TypographyFontWeight),
] as const);
