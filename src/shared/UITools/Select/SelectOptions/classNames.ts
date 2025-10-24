export const className = 'SelectOptions';

// utils
import { composeClassNames } from 'utils';

export const classNames = composeClassNames(className, [className, 'selected'] as const);
