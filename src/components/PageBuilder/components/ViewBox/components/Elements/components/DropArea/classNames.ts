import { mapValues } from 'lodash';
import { DropAreaPosition } from './enums';

export const className = 'DropAnchors';

export const classNames = {
  [className]: className,
  prompt: {
    name: `${className}__prompt`,
    modificators: {
      ...mapValues(
        DropAreaPosition,
        (position) => `${className}__prompt--${position}`,
      ),
    },
  },
  anchor: {
    name: `${className}__anchor`,
    modificators: {
      ...mapValues(
        DropAreaPosition,
        (position) => `${className}__anchor--${position}`,
      ),
    },
  },
};
