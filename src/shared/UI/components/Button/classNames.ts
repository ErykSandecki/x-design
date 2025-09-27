import { values } from 'lodash';

// types
import { ButtonColor, ButtonVariant } from './enums';
import { InputSize } from '../../enums';

// utils
import { composeClassNames } from 'utils';

export const className = 'Button';

export const classes = {
  className,
};

export const classNames = composeClassNames(
  className,
  [
    className,
    'forcedHover',
    'fullwidth',
    ...values(ButtonColor),
    ...values(InputSize),
    ...values(ButtonVariant),
  ] as const,
  ['icon', 'end', 'start', ...values(InputSize)] as const,
);
