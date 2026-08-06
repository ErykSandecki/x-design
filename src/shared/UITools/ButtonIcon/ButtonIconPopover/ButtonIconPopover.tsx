import cx from 'classnames';
import { FC, RefObject } from 'react';

// components
import Popover, { PopoverCompound, TPopoverProps } from '../../Popover/Popover';

// styles
import styles from './button-icon-popover.module.scss';

// utils
import { stopPropagation } from 'utils';

export type TButtonIconPopoverProps = Pick<
  TPopoverProps,
  'alignHorizontally' | 'alignVertically' | 'children' | 'id' | 'offset' | 'style'
> & {
  ref: RefObject<HTMLDivElement>;
  selected: boolean;
  setSelected: TFunc<[boolean]>;
};

export const ButtonIconPopover: FC<TButtonIconPopoverProps> = ({
  alignHorizontally,
  alignVertically,
  children,
  id,
  offset,
  ref,
  selected,
  setSelected,
  style,
}) => (
  <div className={cx(styles.ButtonIconPopover)} onMouseOver={stopPropagation}>
    <Popover
      alignHorizontally={alignHorizontally}
      alignVertically={alignVertically}
      backgroundColor="neutral5"
      e2eValue="popover"
      id={id}
      offset={offset}
      refItem={ref}
      selected={selected}
      style={style}
    >
      <PopoverCompound.PopoverRoot selected={selected} setSelected={setSelected}>
        {children}
      </PopoverCompound.PopoverRoot>
    </Popover>
  </div>
);

export default ButtonIconPopover;
