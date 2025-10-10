// types
import { TTooltipProps } from '../../UI/Tooltip/Tooltip';
import { TIconProps } from '../../UI/Icon/Icon';

export type TButtonGroup = {
  disabled?: boolean;
  name: TIconProps['name'];
  onClick: TFunc;
  tooltip?: Omit<TTooltipProps, 'children'>;
};
