// utils
import { composeClassNames } from 'utils';

export const className = 'Elements';

export const classNames = composeClassNames(
  className,
  [className, 'eventsDisabled'] as const,
  ['element', 'eventsDisabled'] as const,
);
