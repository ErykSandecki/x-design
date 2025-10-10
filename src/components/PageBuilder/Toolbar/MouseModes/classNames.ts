// utils
import { composeClassNames } from 'utils';

export const className = 'MouseModes';

export const classes = {
  className,
};

export const classNames = composeClassNames(className, [className] as const, ['button', 'active'] as const);
