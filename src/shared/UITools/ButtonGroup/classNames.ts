// utils
import { composeClassNames } from 'utils';

export const className = 'ButtonGroup';

export const classNames = composeClassNames(
  className,
  [className, 'fullWidth'] as const,
  ['button', 'disabled'] as const,
  ['icon', 'disabled'] as const,
);
