import { FC } from 'react';
import { Spin } from 'antd';

// components
import Box from '../../../../../../UI/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './color-grid.scss';

// types
import { TUseColorSamplerEvents } from '../../hooks/useColorSamplerEvents';

export type TColorResultProps = {
  colors: TUseColorSamplerEvents['colors'];
  isPending: TUseColorSamplerEvents['isPending'];
};

export const ColorGrid: FC<TColorResultProps> = ({ colors, isPending }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      sx={{
        borderRadius: '5px',
        height: '48px',
        overflow: 'hidden',
        position: 'relative',
        width: '48px',
      }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', height: '100%', width: '100%' }}>
        {colors.map(({ a, b, g, r }, index) => (
          <Box
            classes={{ className: cx(classNamesWithTheme.pickerGrid) }}
            key={index}
            style={{ backgroundColor: `rgba(${r},${g},${b},${a})` }}
          />
        ))}
      </Box>
      <Box
        classes={{ className: cx(classNamesWithTheme.pickerTargetColor) }}
        sx={{ borderRadius: '2.5px', height: '6.85px', left: '50%', position: 'absolute', top: '50%', width: '6.85px' }}
      />
      {isPending && (
        <Box
          sx={{
            alignItems: 'center',
            bg: 'neutral4',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
          }}
        >
          <Spin />
        </Box>
      )}
    </Box>
  );
};

export default ColorGrid;
