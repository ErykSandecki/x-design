import { kebabCase, mapValues } from 'lodash';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';
import { Constrain } from '../../enums';

export const className = 'ConstrainsView';

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      selected: `${className}--selected`,
    },
  },
  horizontal: {
    name: `${className}__horizontal`,
    modificators: {
      ...mapValues(AlignmentHorizontal, (alignment) => `${className}__horizontal--${kebabCase(alignment)}`),
    },
  },
  vertical: {
    name: `${className}__vertical`,
    modificators: {
      ...mapValues(AlignmentVertical, (alignment) => `${className}__vertical--${kebabCase(alignment)}`),
    },
  },
  constrain: {
    name: `${className}__constrain`,
    modificators: {
      ...mapValues(Constrain, (position) => `${className}__constrain--${kebabCase(position)}`),
    },
  },
};
