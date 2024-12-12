import { FC, memo } from 'react';

// hooks
import { useTheme } from 'hooks/useTheme/useTheme';

// others
import { className, classNames } from './classNames';
import { TOOLBAR_HEIGHT } from './constants';

// styles
import styles from './toolbar.scss';

export type TProps = {};

const Toolbar: FC<TProps> = ({ ...restProps }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <div
      className={cx(classNamesWithTheme[className])}
      style={{ height: `${TOOLBAR_HEIGHT}px` }}
    ></div>
  );
};

export default memo(Toolbar);
