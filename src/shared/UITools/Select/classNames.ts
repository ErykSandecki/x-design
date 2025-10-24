// utils
import { composeClassNames } from 'utils';

export const className = 'Select';

export const classNames = composeClassNames(
  className,
  [className, 'disabled', 'fullWidth'] as const,
  ['input'] as const,
);
