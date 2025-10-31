import { values } from 'lodash';

// types
import { TextFieldVariant } from '../enums';

// utils
import { composeClassNames } from 'utils';

export const className = 'TextFieldWrapper';

export const classNames = composeClassNames(
  className,
  [className, 'disabled', 'chip', 'fullWidth', ...values(TextFieldVariant)] as const,
  ['input'] as const,
  ['icon'] as const,
  ['chip', 'attachedValue'] as const,
);
