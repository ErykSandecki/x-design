import { FC, ReactNode } from 'react';

// components
import Chip from '../../../Chip/Chip';

// hooks
import { useTheme } from 'hooks';

// others
import { className as classNameChip, classNames } from './classNames';

// styles
import styles from './text-field-chip.scss';

export type TTextFieldChipProps = {
  attachedValue: boolean;
  children: ReactNode;
  className: string;
};

export const TextFieldChip: FC<TTextFieldChipProps> = ({ attachedValue, children, className }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  if (!attachedValue) {
    return null;
  }

  return <Chip className={cx(className, classNamesWithTheme[classNameChip])}>{children}</Chip>;
};

export default TextFieldChip;
