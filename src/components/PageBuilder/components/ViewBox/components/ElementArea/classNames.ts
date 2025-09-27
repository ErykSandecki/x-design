// utils
import { composeClassNames } from 'utils';

export const className = 'ElementArea';

export const classNames = composeClassNames(className, [className] as const, ['label'] as const, ['area'] as const);
