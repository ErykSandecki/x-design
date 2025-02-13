import { mapValues } from 'lodash';

// types
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
