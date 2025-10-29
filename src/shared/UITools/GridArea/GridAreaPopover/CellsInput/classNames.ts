// utils
import { composeClassNames } from 'utils';

export const className = 'CellsInput';

export const classNames = composeClassNames(className, [className] as const, ['cell', 'active', 'selected'] as const);
