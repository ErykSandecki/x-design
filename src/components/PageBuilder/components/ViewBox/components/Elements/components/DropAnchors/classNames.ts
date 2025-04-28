import { mapValues } from 'lodash';

// types
import { DropAnchorsPosition } from './enums';

export const className = 'DropAnchors';

export const classNames = {
  [className]: className,
  prompt: {
    name: `${className}__prompt`,
    modificators: {
      ...mapValues(
        DropAnchorsPosition,
        (position) => `${className}__prompt--${position}`,
      ),
    },
  },
  anchor: {
    name: `${className}__anchor`,
    modificators: {
      ...mapValues(
        DropAnchorsPosition,
        (position) => `${className}__anchor--${position}`,
      ),
    },
  },
};
