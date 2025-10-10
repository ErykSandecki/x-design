// utils
import { composeClassNames } from 'utils';

export const className = 'PanelProperties';

export const classNames = composeClassNames(
  className,
  [className] as const,
  ['areaHandleResize'] as const,
  ['sections'] as const,
);
