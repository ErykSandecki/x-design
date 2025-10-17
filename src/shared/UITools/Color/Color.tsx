import { FC } from 'react';

// components
import Box from '../../UI/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './color.scss';

// utils
import { hexToRgb } from 'utils';

export type TColorProps = {
  alpha: string;
  color: string;
};

export const Color: FC<TColorProps> = ({ alpha, color }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className]),
      }}
      sx={{ borderRadius: '2.5px', display: 'flex', height: '14px', position: 'relative', width: '14px' }}
    >
      <Box
        classes={{ className: cx(classNamesWithTheme.picker) }}
        style={{ backgroundColor: hexToRgb(color, 100) }}
        sx={{ height: '100%', position: 'relative', width: '50%' }}
      />
      <Box
        classes={{ className: cx(classNamesWithTheme.pickerAlpha) }}
        style={{ backgroundColor: hexToRgb(color, parseInt(alpha)) }}
        sx={{ height: '100%', position: 'relative', width: '50%' }}
      />
      <Box
        classes={{ className: cx(classNamesWithTheme.pickerTexture) }}
        sx={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}
      />
    </Box>
  );
};

export default Color;
