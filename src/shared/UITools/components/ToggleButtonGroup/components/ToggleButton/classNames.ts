// utils
import { composeClassNames } from 'utils';

export const className = 'ToggleButton';

export const classNames = composeClassNames(className, [className, 'selected'] as const);
