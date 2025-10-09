import { values } from 'lodash';

// types
import { TooltipPosition } from './enums';

// utils
import { composeClassNames } from 'utils';

export const className = 'Tooltip';

export const classNames = composeClassNames(
  className,
  [className] as const,
  ['container', 'visible'] as const,
  ['content'] as const,
  ['carrot', ...values(TooltipPosition)] as const,
);
