//
import { composeClassNames } from 'utils';

export const className = 'Section';

export const classNames = composeClassNames(
  className,
  [className] as const,
  ['header'] as const,
  ['label'] as const,
  ['buttons'] as const,
);
