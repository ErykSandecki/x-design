// utils
import { composeClassNames } from 'utils';

export const className = 'ColorResult';

export const classNames = composeClassNames(className, [className] as const, ['selectedColor'] as const);
