import { values } from 'lodash';

// types
import { GridColumnType } from './enums';

// utils
import { composeClassNames } from 'utils';

export const className = 'SectionColumn';

export const classNames = composeClassNames(
  className,
  [className, 'withMargin'] as const,
  ['labels'] as const,
  ['label'] as const,
  ['content', ...values(GridColumnType)] as const,
);
