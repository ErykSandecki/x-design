import { mapValues } from 'lodash';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseMode } from 'components/PageBuilder/enums';

export const className = 'ZoomBox';

export const classes = {
  className,
};

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      pressing: `${className}__pressing`,
      ...CURSOR_STATES.reduce(
        (obj, key) => ({ ...obj, [key]: `${className}__${key}` }),
        {},
      ),
      ...mapValues(MouseMode, (mode) => `${className}__${mode}`),
    },
  },
  zoomContent: `${className}__zoom-content`,
};
