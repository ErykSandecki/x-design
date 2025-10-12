// utils
import { composeClassNames } from 'utils';

export const className = 'PossibleElement';

export const classNames = composeClassNames(className, [className] as const, ['label'] as const);
