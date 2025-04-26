// types
import { TIconProps } from '../../../UI/components/Icon/Icon';

export type TButtonGroup = {
  disabled?: boolean;
  name: TIconProps['name'];
  onClick: () => void;
};
