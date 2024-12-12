import { forwardRef, memo } from 'react';

// hooks
import { useTheme } from 'hooks/useTheme/useTheme';

// others
import { className, classNames } from './classNames';
import { PANEL_PROPERTIES_ID, PANEL_PROPERTIES_WIDTH } from './constants';

// styles
import styles from './panel-properties.scss';

const PanelProperties = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <div
      className={cx(classNamesWithTheme[className])}
      id={PANEL_PROPERTIES_ID}
      ref={ref}
      style={{ width: PANEL_PROPERTIES_WIDTH }}
    ></div>
  );
});

export default memo(PanelProperties);
