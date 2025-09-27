// utils
import { composeClassNames } from 'utils';

export const className = 'ColorSampler';

export const classNames = composeClassNames(
  className,
  [className] as const,
  ['preventAntdEventMask'] as const,
  ['pickerWrapper'] as const,
  ['picker'] as const,
  ['pickerGrid'] as const,
  ['pickerTargetColor'] as const,
  ['pickerLoader'] as const,
  ['data'] as const,
  ['header'] as const,
  ['selectedColor'] as const,
  ['prompt'] as const,
  ['promptDescription'] as const,
);
