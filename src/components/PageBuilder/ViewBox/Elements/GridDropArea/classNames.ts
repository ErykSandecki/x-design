// utils
import { composeClassNames } from 'utils';

export const className = 'GridDropArea';

export const classNames = composeClassNames(className, [className, 'hovered'] as const);
