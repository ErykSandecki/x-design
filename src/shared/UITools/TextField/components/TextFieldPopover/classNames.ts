// utils
import { composeClassNames } from 'utils';

export const className = 'TextFieldPopover';

export const classNames = composeClassNames(className, [className] as const, ['icon'] as const);
