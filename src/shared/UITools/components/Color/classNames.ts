// utils
import { composeClassNames } from 'utils';

export const className = 'Color';

export const classNames = {
  [className]: className,
  picker: `${className}__picker`,
  pickerAlpha: `${className}__picker-alpha`,
  pickerTexture: `${className}__picker-texture`,
};

composeClassNames(
  className,
  [className] as const,
  ['picker'] as const,
  ['pickerAlpha'] as const,
  ['pickerTexture'] as const,
);
