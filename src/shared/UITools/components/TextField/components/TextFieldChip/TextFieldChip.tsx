import { FC, ReactNode } from 'react';

// components
import Chip from '../../../Chip/Chip';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './text-field-chip.scss';

export type TTextFieldChipProps = {
  children: ReactNode;
};

export const TextFieldChip: FC<TTextFieldChipProps> = ({ children }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return <Chip className={cx(classNamesWithTheme[className])}>{children}</Chip>;
};

export default TextFieldChip;
