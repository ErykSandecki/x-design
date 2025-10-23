// utils
import { composeClassNames } from 'utils';

export const className = 'SectionColumnLabels';

export const classNames = composeClassNames(className, [className] as const, ['label'] as const);
