// utils
import { composeClassNames } from 'utils';

export const className = 'TextField';

export const classNames = composeClassNames(
  className,
  [className, 'disabled', 'fullWidth'] as const,
  ['input'] as const,
  ['icon'] as const,
);
