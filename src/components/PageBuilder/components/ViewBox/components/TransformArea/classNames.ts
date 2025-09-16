import { mapValues } from 'lodash';

// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';

export const className = 'TransformArea';

export const classNames = {
  [className]: className,
  anchorResize: {
    name: `${className}__anchor-resize`,
    modificators: {
      ...mapValues(
        AnchorResize,
        (anchor) => `${className}__anchor-resize--${anchor}`,
      ),
    },
  },
  anchorRotate: {
    name: `${className}__anchor-rotate`,
    modificators: {
      ...mapValues(
        AnchorRotate,
        (anchor) => `${className}__anchor-rotate--${anchor}`,
      ),
    },
  },
};
