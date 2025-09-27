// utils
import { composeClassNames } from 'utils';

export const className = 'ViewBox';

export const classNames = composeClassNames(className, [className, 'createFrame'] as const);
