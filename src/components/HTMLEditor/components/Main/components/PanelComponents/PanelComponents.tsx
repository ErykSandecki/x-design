import { forwardRef } from 'react';

// hooks
import { useTheme } from 'hooks/useTheme/useTheme';

// others
import { BLOCKS_PANEL_ID } from './constants';
import { className, classNames } from './classNames';

// styles
import styles from './styles/panel-components.scss';

export type TProps = {};

const PanelComponents = forwardRef<HTMLDivElement, TProps>((_, ref) => {
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

export default PanelComponents;
