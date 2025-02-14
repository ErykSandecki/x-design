import { mapValues } from 'lodash';

// types
import { ColorsTheme } from 'types/enums/scss/colorsTheme';
import {
  TypographyFontStyle,
  TypographyFontWeight,
  TypographyFontType,
} from './enums';

export const className = 'Typography';

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      noWrap: `${className}--no-wrap`,
      withoutMargin: `${className}--without-margin`,
      ...mapValues(ColorsTheme, (color) => `${className}--${color}`),
      ...mapValues(
        TypographyFontType,
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
