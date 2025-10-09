// types
import { TTooltipProps } from '../../../UI/components/Tooltip/Tooltip';
import { TIconProps } from '../../../UI/components/Icon/Icon';

export type TButtonGroup = {
  disabled?: boolean;
  name: TIconProps['name'];
  onClick: TFunc;
  tooltip?: Omit<TTooltipProps, 'children'>;
};
