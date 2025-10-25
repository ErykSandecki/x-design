// utils
import { composeClassNames } from 'utils';

export const className = 'PreviewBoxSizing';

export const classNames = composeClassNames(
  className,
  [className, 'excluded'] as const,
  ['tileLeft'] as const,
  ['tileRight'] as const,
  ['tileChildren'] as const,
  ['stroke', 'excluded'] as const,
);
