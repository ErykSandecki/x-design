//
import { composeClassNames } from 'utils';

export const className = 'DraggableSectionAnchor';

export const classNames = composeClassNames(className, [className, 'draggable'] as const, ['prompt'] as const);
