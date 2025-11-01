// utils
import { composeClassNames } from 'utils';

export const className = 'Checkbox';

export const classNames = composeClassNames(
  className,
  [className] as const,
  ['input'] as const,
  ['inputWrapper'] as const,
  ['label'] as const,
);
