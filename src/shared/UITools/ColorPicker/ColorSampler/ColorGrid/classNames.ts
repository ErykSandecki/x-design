// utils
import { composeClassNames } from 'utils';

export const className = 'ColorGrid';

export const classNames = composeClassNames(
  className,
  [className] as const,
  ['pickerGrid'] as const,
  ['pickerTargetColor'] as const,
);
