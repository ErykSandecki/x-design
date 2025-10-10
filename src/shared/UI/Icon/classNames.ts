import { values } from 'lodash';

// types
import { ColorsTheme } from 'types';

// utils
import { composeClassNames } from 'utils';

export const className = 'Icon';

export const classes = {
  className,
};

export const classNames = composeClassNames(className, [
  className,
  'clickable',
  'disabled',
  ...values(ColorsTheme),
] as const);
