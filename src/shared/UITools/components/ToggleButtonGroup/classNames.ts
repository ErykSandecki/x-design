// utils
import { composeClassNames } from 'utils';

export const className = 'ToggleButtonGroup';

export const classNames = composeClassNames(className, [className, 'fullWidth'] as const);
