import { mapValues } from 'lodash';

// types
import { AnchorResize } from 'store/pageBuilder/enums';

export const className = 'TransformArea';

export const classNames = {
  [className]: className,
  anchor: {
    name: `${className}__anchor`,
    modificators: {
      ...mapValues(AnchorResize, (anchor) => `${className}__anchor--${anchor}`),
    },
  },
};
