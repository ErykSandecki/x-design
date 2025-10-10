// utils
import { composeClassNames } from 'utils';

export const className = 'Corners';

export const classNames = composeClassNames(className, [className, 'increaseZIndex'] as const);
