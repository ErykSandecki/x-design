import { values } from 'lodash';

// types
import { AlignmentFlow } from 'types';

// utils
import { composeClassNames } from 'utils';

export const className = 'AlignmentOption';

export const classNames = composeClassNames(
  className,
  [className, 'selected'] as const,
  ['optionView', ...values(AlignmentFlow)] as const,
  ['indicator', 'selected'] as const,
);
