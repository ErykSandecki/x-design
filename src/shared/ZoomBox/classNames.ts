import { values } from 'lodash';

// others
import { CURSOR_STATES } from 'constant/constants';

// types
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { composeClassNames } from 'utils';

export const className = 'ZoomBox';

export const classes = {
  className,
};

export const classNames = composeClassNames(
  className,
  [className, 'colorSampler', 'pressing', ...CURSOR_STATES, ...values(MouseMode)] as const,
  ['backgroundMask'] as const,
  ['textureBlank'] as const,
  ['zoomContent'] as const,
);
