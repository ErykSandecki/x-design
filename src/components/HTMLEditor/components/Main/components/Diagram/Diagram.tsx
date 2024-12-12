import { forwardRef, memo } from 'react';

// hooks
import { useTheme } from 'hooks/useTheme/useTheme';

// others
import { className, classNames } from './classNames';

// styles
import styles from './styles/diagram.scss';

// types
import { MouseMode } from '../../../../enums';

export type TProps = {};

const Diagram = forwardRef<HTMLDivElement, TProps>(() => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <div
      className={cx(classNamesWithTheme[className].name)}
      onContextMenu={(event) => event.preventDefault()}
      tabIndex={0}
    ></div>
  );
});

export default memo(Diagram);
