import { mapValues } from 'lodash';

// types
import { ColorsTheme } from 'types';

export const className = 'Icon';

export const classes = {
  className,
};

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      clickable: `${className}--clickable`,
      disabled: `${className}--disabled`,
      ...mapValues(ColorsTheme, (color) => `${className}--${color}`),
    },
  },
};
