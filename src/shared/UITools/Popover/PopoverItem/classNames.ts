// utils
import { composeClassNames } from 'utils';

export const className = 'PopoverItem';

export const classNames = composeClassNames(
  className,
  [className] as const,
  ['checkIcon', 'selected'] as const,
  ['icon'] as const,
  ['text'] as const,
);
