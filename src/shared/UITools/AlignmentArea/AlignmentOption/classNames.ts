import { values } from 'lodash';

// types
import { AlignmentLayout } from 'types';

// utils
import { composeClassNames } from 'utils';

export const className = 'AlignmentOption';

export const classNames = composeClassNames(
  className,
  [className, 'selected'] as const,
  ['optionView', ...values(AlignmentLayout)] as const,
  ['indicator', 'selected'] as const,
);
