// types
import { TIconProps } from '../Icon/Icon';

export type TButtonIcon = null | Pick<TIconProps, 'name'>;

export type TButtonIconArgs = {
  placement: 'start' | 'end';
  src: TButtonIcon;
};
