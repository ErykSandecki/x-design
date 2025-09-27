import { values } from 'lodash';

// utils
import { composeClassNames } from 'utils';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';

export const className = 'Anchors';

export const classNames = composeClassNames(className, [className, ...values(DropAnchorsPosition)] as const);
