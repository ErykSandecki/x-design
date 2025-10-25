// utils
import { composeClassNames } from 'utils';

export const className = 'GridArea';

export const classNames = composeClassNames(className, [className, 'fullWidth'] as const);
