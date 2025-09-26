import { FC } from 'react';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './popover-separator.scss';

export const PopoverSeparator: FC = () => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return <div className={cx(classNamesWithTheme[className])} />;
};

export default PopoverSeparator;
