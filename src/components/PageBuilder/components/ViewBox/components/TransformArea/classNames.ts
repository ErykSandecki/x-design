import { values } from 'lodash';

// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';

// utils
import { composeClassNames } from 'utils';

export const className = 'TransformArea';

export const classNames = composeClassNames(
  className,
  [className] as const,
  ['anchorResize', ...values(AnchorResize)] as const,
  ['anchorRotate', ...values(AnchorRotate)] as const,
);
