import { mapValues } from 'lodash';

// types
import { AnchorResize } from 'store/pageBuilder/enums';

export const className = 'TransformArea';

export const classNames = {
  [className]: className,
  anchorResize: {
    name: `${className}__anchor--resize`,
    modificators: {
      ...mapValues(
        AnchorResize,
        (anchor) => `${className}__anchor-resize--${anchor}`,
      ),
    },
  },
};
