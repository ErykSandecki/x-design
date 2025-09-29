import { FC, memo } from 'react';

// components
import MouseModes, { TMouseModeProps } from './components/MouseModes';
import { Box } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './toolbar.scss';

// types
import { ZIndex } from 'types';

export type TToolbarProps = Pick<TMouseModeProps, 'mouseMode' | 'setMouseMode'>;

const Toolbar: FC<TToolbarProps> = ({ ...restProps }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      onMouseDown={(event) => event.stopPropagation()}
      style={{ touchAction: 'manipulation' }}
      sx={{
        bg: 'neutral5',
        borderRadius: '12px',
        bottom: '12px',
        boxSizing: 'border-box',
        height: `48px`,
        left: '50%',
        p: 8,
        position: 'absolute',
        zIndex: ZIndex.standard,
      }}
    >
      <MouseModes {...restProps} />
    </Box>
  );
};

export default memo(Toolbar);
