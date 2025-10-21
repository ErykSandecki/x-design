import { values } from 'lodash';

// types
import { AlignmentFlow } from 'types';

// utils
import { composeClassNames } from 'utils';

export const className = 'AlignmentArea';

export const classNames = composeClassNames(
  className,
  [className, 'fullWidth'] as const,
  ['option', 'selected'] as const,
  ['optionView', ...values(AlignmentFlow)] as const,
  ['indicator', 'selected'] as const,
);
