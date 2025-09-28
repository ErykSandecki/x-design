// utils
import { composeClassNames } from 'utils';

export const className = 'ClickableArea';

export const classNames = composeClassNames(className, [className] as const, ['outline'] as const);
