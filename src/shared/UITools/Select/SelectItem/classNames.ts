export const className = 'SelectItem';

// utils
import { composeClassNames } from 'utils';

export const classNames = composeClassNames(
  className,
  [className, 'disabled', 'selected'] as const,
  ['checkIcon', 'selected'] as const,
);
