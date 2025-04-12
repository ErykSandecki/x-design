import { mapValues } from 'lodash';
import { DropAreaPosition } from './enums';

export const className = 'DropArea';

export const classNames = {
  [className]: className,
  area: `${className}__area`,
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
