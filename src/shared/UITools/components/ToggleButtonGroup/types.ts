import { TIconProps } from 'shared/UI/components/Icon/Icon';
import { TToggleButtonProps } from './components/ToggleButton/ToggleButton';

export type TToggleButton<V> = Pick<TToggleButtonProps<V>, 'tooltip' | 'value'> & {
  icon: TIconProps['name'];
};

export type TToggleButtonGroupValue = string | Array<string>;
