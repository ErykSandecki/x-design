import { mapValues } from 'lodash';

// types
import { ColorsTheme } from 'types/enums/scss/colorsTheme';
import {
  TypographyFontStyle,
  TypographyFontWeight,
  TypographyVariant,
} from './enums';

export const className = 'Typography';

export const classes = {
  className,
};

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      gutterBottom: `${className}--gutter-bottom`,
      noWrap: `${className}--no-wrap`,
      ...mapValues(ColorsTheme, (color) => `${className}--${color}`),
      ...mapValues(
        TypographyVariant,
        (fontType) => `${className}--${fontType}`,
      ),
      ...mapValues(
        TypographyFontStyle,
        (fontStyle) => `${className}--${fontStyle}`,
      ),
      ...mapValues(
        TypographyFontWeight,
        (fontWeight) => `${className}--${fontWeight}`,
      ),
    },
  },
};
