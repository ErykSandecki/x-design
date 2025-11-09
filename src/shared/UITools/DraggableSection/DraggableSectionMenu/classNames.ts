//
import { composeClassNames } from 'utils';

export const className = 'DraggableSectionMenu';

export const classNames = composeClassNames(className, [className, 'forceDisplay'] as const);
