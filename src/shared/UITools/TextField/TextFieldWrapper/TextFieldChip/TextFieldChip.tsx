import cx from 'classnames';
import { FC, ReactNode } from 'react';

// components
import Chip from '../../../Chip/Chip';

// others

// styles
import styles from './text-field-chip.module.scss';

export type TTextFieldChipProps = {
  attachedValue: boolean;
  children: ReactNode;
  className: string;
};

export const TextFieldChip: FC<TTextFieldChipProps> = ({ attachedValue, children, className }) => {
  if (!attachedValue) {
    return null;
  }

  return <Chip className={cx(className, styles.TextFieldChip)}>{children}</Chip>;
};

export default TextFieldChip;
