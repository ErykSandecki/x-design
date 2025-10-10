// utils
import { composeClassNames } from 'utils';

export const className = 'Color';

export const classNames = composeClassNames(
  className,
  [className] as const,
  ['picker'] as const,
  ['pickerAlpha'] as const,
  ['pickerTexture'] as const,
);
