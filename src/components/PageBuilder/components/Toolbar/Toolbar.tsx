import { FC, memo } from 'react';

// components
import MouseModes, { TMouseModeProps } from './components/MouseModes';
import { Box } from 'shared';

// types
import { ZIndex } from 'types';

export type TProps = Pick<TMouseModeProps, 'mouseMode' | 'setMouseMode'>;

const Toolbar: FC<TProps> = ({ ...restProps }) => (
  <Box
    onMouseDown={(event) => event.stopPropagation()}
    style={{ touchAction: 'manipulation' }}
    sx={{
      bg: 'neutral5',
      borderBottom: 1,
      boxSizing: 'border-box',
      height: '56px',
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
