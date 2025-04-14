import { FC, memo } from 'react';

// components
import MouseModes, { TMouseModeProps } from './components/MouseModes';
import { Box } from 'shared';

// others
import { TOOLBAR_HEIGHT } from 'components/PageBuilder/constants';

// types
import { ZIndex } from 'types';

export type TToolbarProps = Pick<TMouseModeProps, 'mouseMode' | 'setMouseMode'>;

const Toolbar: FC<TToolbarProps> = ({ ...restProps }) => (
  <Box
    onMouseDown={(event) => event.stopPropagation()}
    style={{ touchAction: 'manipulation' }}
    sx={{
      bg: 'neutral5',
      borderBottom: 1,
      boxSizing: 'border-box',
      height: `${TOOLBAR_HEIGHT}px`,
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: ZIndex.standard,
    }}
  >
    <MouseModes {...restProps} />
  </Box>
);

export default memo(Toolbar);
