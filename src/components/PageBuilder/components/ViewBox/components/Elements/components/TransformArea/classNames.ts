import { mapValues } from 'lodash';

// types
import { Anchor } from 'store/pageBuilder/enums';

export const className = 'TransformArea';

export const classNames = {
  [className]: className,
  anchor: {
    name: `${className}__anchor`,
    modificators: {
      ...mapValues(Anchor, (anchor) => `${className}__anchor--${anchor}`),
    },
  },
};
