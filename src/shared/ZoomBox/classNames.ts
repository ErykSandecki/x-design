// others
import { CURSOR_STATES } from 'constant/constants';

export const className = 'ZoomBox';

export const classes = {
  className,
};

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      ...CURSOR_STATES.reduce(
        (obj, key) => ({ ...obj, [key]: `${className}__${key}` }),
        {},
      ),
    },
  },
  zoomContent: `${className}__zoom-content`,
};
