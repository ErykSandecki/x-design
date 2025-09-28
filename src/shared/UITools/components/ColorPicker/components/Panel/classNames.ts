// utils
import { composeClassNames } from 'utils';

export const className = 'Panel';

export const classNames = composeClassNames(className, [className] as const, ['header'] as const);
