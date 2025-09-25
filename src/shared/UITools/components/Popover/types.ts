// types
import { TIconProps } from 'shared/UI/components/Icon/Icon';

export type TPopoverData = {
  icon?: TIconProps['name'];
  onClick?: () => void;
  selected?: boolean;
  text: string;
};

export type TPopoverSeparator = { separator: boolean };

export type TPopoverItem = TPopoverData | TPopoverSeparator;

export type TPopover = {
  data: Array<TPopoverData | TPopoverSeparator>;
};
