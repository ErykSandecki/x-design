import { values } from 'lodash';

// utils
import { composeClassNames } from 'utils';

export const className = 'TextFieldLabel';

export const classNames = composeClassNames(className, [className] as const);
