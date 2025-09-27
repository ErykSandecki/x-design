// utils
import { composeClassNames } from 'utils';

export const className = 'Tabs';

export const classNames = composeClassNames(className, [className] as const, ['tab', 'active', 'disabled'] as const);
