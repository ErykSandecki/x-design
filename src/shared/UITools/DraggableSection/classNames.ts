//
import { composeClassNames } from 'utils';

export const className = 'DraggableSection';

export const classNames = composeClassNames(
  className,
  [className, 'draggable'] as const,
  ['item', 'selected'] as const,
  ['menu'] as const,
);
