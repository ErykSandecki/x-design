import cx from 'classnames';
import { FC } from 'react';

// components
import Box from '../../UI/Box/Box';

// others

// styles
import styles from './color.scss';

// utils
import { hexToRgb } from 'utils';

export type TColorProps = {
  alpha: string;
  color: string;
};

export const Color: FC<TColorProps> = ({ alpha, color }) => (
  <Box
    classes={{
      className: cx(styles.Color),
    }}
    sx={{ borderRadius: '2.5px', display: 'flex', height: '14px', position: 'relative', width: '14px' }}
  >
    <Box
      classes={{ className: cx(styles.Color__picker) }}
      style={{ backgroundColor: hexToRgb(color, 100) }}
      sx={{ height: '100%', position: 'relative', width: '50%' }}
    />
    <Box
      classes={{ className: cx(styles['Color__picker-alpha']) }}
      style={{ backgroundColor: hexToRgb(color, parseInt(alpha)) }}
      sx={{ height: '100%', position: 'relative', width: '50%' }}
    />
    <Box
      classes={{ className: cx(styles['Color__picker-texture']) }}
      sx={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}
    />
  </Box>
);

export default Color;
