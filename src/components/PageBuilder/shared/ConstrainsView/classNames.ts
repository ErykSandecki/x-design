import { values } from 'lodash';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';
import { Constrain } from '../../enums';

// utils
import { composeClassNames } from 'utils';

export const className = 'ConstrainsView';

export const classNames = composeClassNames(
  className,
  [className, 'selected'] as const,
  ['horizontal', ...values(AlignmentHorizontal)] as const,
  ['vertical', ...values(AlignmentVertical)] as const,
  ['constrain', ...values(Constrain)] as const,
);
