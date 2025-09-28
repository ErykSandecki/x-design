import { values } from 'lodash';

// types
import { ElementStickWallPosition } from 'components/PageBuilder/components/ViewBox/types/enums';

// utils
import { composeClassNames } from 'utils';

export const className = 'Frame';

export const classNames = composeClassNames(
  className,
  [className] as const,
  ['wrapper'] as const,
  ['label', 'hover', 'selected', ...values(ElementStickWallPosition)] as const,
);
