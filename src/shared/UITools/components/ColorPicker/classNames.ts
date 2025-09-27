// utils
import { composeClassNames } from 'utils';

export const className = 'ColorPicker';

export const classes = {
  className,
};

export const classNames = composeClassNames(
  className,
  [className] as const,
  ['hexInput'] as const,
  ['alphaInput'] as const,
  ['alphaInputUnit'] as const,
);
