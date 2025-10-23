import { values } from 'lodash';

// types
import { GridColumnType } from '../enums';

// utils
import { composeClassNames } from 'utils';

export const className = 'SectionColumnContent';

export const classNames = composeClassNames(
  className,
  [className, ...values(GridColumnType)] as const,
  ['inputConnector'] as const,
);
