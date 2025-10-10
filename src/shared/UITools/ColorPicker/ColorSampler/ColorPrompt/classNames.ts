// utils
import { composeClassNames } from 'utils';

export const className = 'ColorPrompt';

export const classNames = composeClassNames(className, [className] as const, ['description'] as const);
