import { FC } from 'react';

// components
import Box from '../../../../../../UI/Box/Box';
import { Small } from '../../../../../../UI/Typography';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { MIDDLE_ARRAY } from '../../constants';

// styles
import styles from './color-result.scss';

// types
import { TUseColorSamplerEvents } from '../../hooks/useColorSamplerEvents';

// utils
import { rgbToHex } from 'utils';

export type TColorResultProps = {
  colors: TUseColorSamplerEvents['colors'];
};

export const ColorResult: FC<TColorResultProps> = ({ colors }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { r, g, b, a } = colors[MIDDLE_ARRAY] || { a: 0, b: 0, g: 0, r: 0 };

  return (
    <Box classes={{ className: cx(classNamesWithTheme[className]) }} sx={{ alignItems: 'center', display: 'flex' }}>
      <Box
        classes={{ className: cx(classNamesWithTheme.selectedColor) }}
        style={{ backgroundColor: `rgba(${r},${g},${b},${a})` }}
        sx={{ borderRadius: '2.5px', boxSizing: 'border-box', height: '16px', m: 8, width: '16px' }}
      />
      <Small>{rgbToHex(r, g, b)}</Small>
    </Box>
  );
};

export default ColorResult;
