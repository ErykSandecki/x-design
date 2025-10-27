// utils
import { composeClassNames } from 'utils';

export const className = 'GridInputs';

export const classNames = composeClassNames(className, [className] as const, ['separator'] as const);
