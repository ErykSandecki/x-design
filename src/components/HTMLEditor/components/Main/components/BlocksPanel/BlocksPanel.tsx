import { forwardRef } from 'react';

// hooks
import { useTheme } from 'hooks/useTheme/useTheme';

// others
import { BLOCKS_PANEL_ID } from './constants';
import { className, classNames } from './classNames';

// styles
import styles from './styles/blocks-panel.scss';

export type TProps = {};

const BlocksPanel = forwardRef<HTMLDivElement, TProps>((_, ref) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <div
      className={cx(classNamesWithTheme[className].name)}
      id={BLOCKS_PANEL_ID}
      ref={ref}
      style={{ width: '250px' }}
    ></div>
  );
});

export default BlocksPanel;
