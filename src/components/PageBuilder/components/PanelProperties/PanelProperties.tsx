import { FC, memo, useRef } from 'react';

// components
import { Box, E2EDataAttribute } from 'shared';

// hooks
import { useResizeHandler, useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { TOOLBAR_HEIGHT } from 'components/PageBuilder/constants';

// styles
import styles from './panel-properties.scss';

// types
import { E2EAttribute, ZIndex } from 'types';

export type TPanelPropertiesProps = {};

const PanelProperties: FC<TPanelPropertiesProps> = () => {
  const boxRef = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { onMouseDownX, width } = useResizeHandler(
    0,
    240,
    window.innerHeight - TOOLBAR_HEIGHT,
    500,
    0,
    240,
    boxRef,
  );

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      onMouseDown={(event) => event.stopPropagation()}
      ref={boxRef}
      style={{ touchAction: 'manipulation' }}
      sx={{
        bg: 'neutral5',
        borderLeft: 1,
        boxSizing: 'border-box',
        height: `calc(100vh - ${TOOLBAR_HEIGHT}px)`,
        position: 'absolute',
        right: 0,
        top: `${TOOLBAR_HEIGHT}px`,
        width: `${width}px`,
        zIndex: ZIndex.standard,
      }}
    >
      <E2EDataAttribute type={E2EAttribute.resize}>
        <div
          className={cx(classNamesWithTheme.areaHandleResize)}
          onMouseDown={(event) => onMouseDownX(event, true)}
        />
      </E2EDataAttribute>
    </Box>
  );
};

export default memo(PanelProperties);
