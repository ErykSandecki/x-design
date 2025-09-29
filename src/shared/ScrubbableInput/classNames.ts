// utils
import { composeClassNames } from 'utils';

export const className = 'ScrubbableInput';

export const classNames = composeClassNames(className, [className, 'disabled'] as const, ['handler'] as const);
