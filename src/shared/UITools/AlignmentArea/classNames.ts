import { values } from 'lodash';

// types
import { AlignmentLayout } from 'types';

// utils
import { composeClassNames } from 'utils';

export const className = 'AlignmentArea';

export const classNames = composeClassNames(
  className,
  [className, 'fullWidth'] as const,
  ['option', 'selected'] as const,
  ['optionView', ...values(AlignmentLayout)] as const,
  ['indicator', 'selected'] as const,
);
