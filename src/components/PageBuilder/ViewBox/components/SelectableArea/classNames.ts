// utils
import { composeClassNames } from 'utils';

export const className = 'SelectableArea';

export const classNames = composeClassNames(className, [className] as const, ['area'] as const);
