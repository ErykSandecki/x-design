// utils
import { composeClassNames } from 'utils';

export const className = 'Cells';

export const classNames = composeClassNames(className, [className] as const, ['cell'] as const, ['sizes'] as const);
