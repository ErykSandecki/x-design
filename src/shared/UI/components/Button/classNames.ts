import { mapValues } from 'lodash';

// types
import { ButtonColor, ButtonVariant } from './enums';
import { InputSize } from '../../enums';

export const className = 'Button';

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      forcedHover: `${className}--forced-hover`,
      fullwidth: `${className}--full-width`,
      ...mapValues(ButtonColor, (color) => `${className}--${color}`),
      ...mapValues(InputSize, (size) => `${className}--${size}`),
      ...mapValues(ButtonVariant, (variant) => `${className}--${variant}`),
    },
  },
  icon: {
    name: `${className}__icon`,
    modificators: {
      applyFill: `${className}__icon--apply-fill`,
      applyStroke: `${className}__icon--apply-stroke`,
      end: `${className}__icon--end`,
      start: `${className}__icon--start`,
      ...mapValues(InputSize, (size) => `${className}__icon--${size}`),
    },
  },
};
