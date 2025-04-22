import { mapValues } from 'lodash';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseMode } from 'types/enums/mouseMode';

export const className = 'ZoomBox';

export const classes = {
  className,
};

export const classNames = {
  [className]: {
    name: className,
    modificators: {
      colorSampler: `${className}--color-sampler`,
      pressing: `${className}--pressing`,
      ...CURSOR_STATES.reduce(
        (obj, key) => ({ ...obj, [key]: `${className}--${key}` }),
        {},
      ),
      ...mapValues(MouseMode, (mode) => `${className}--${mode}`),
    },
  },
  backgroundMask: `${className}__background-mask`,
  textureBlank: `${className}__texture-blank`,
  zoomContent: `${className}__zoom-content`,
};
