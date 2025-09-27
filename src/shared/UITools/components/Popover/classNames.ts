// utils
import { composeClassNames } from 'utils';

export const className = 'Popover';

export const classNames = composeClassNames(className, [className, 'selected'] as const);
