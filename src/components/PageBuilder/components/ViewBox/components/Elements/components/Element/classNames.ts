// utils
import { composeClassNames } from 'utils';

export const className = 'Element';

export const classes = {
  className,
};

export const classNames = composeClassNames(
  className,
  [className, 'moving'] as const,
  ['wrapper', 'hover', 'moving'] as const,
);
