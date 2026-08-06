import cx from 'classnames';
import { FC } from 'react';

// styles
import styles from './popover-separator.module.scss';

export type TPopoverSeparatorProps = {
  visible?: boolean;
};

export const PopoverSeparator: FC<TPopoverSeparatorProps> = ({ visible = true }) =>
  visible ? <div className={cx(styles.PopoverSeparator)} /> : null;

export default PopoverSeparator;
