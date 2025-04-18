import { FC } from 'react';

// components
import Box from '../../../UI/components/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './color.scss';

// types
import { E2EAttribute } from 'types';

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
      e2eAttribute={E2EAttribute.color}
    >
      <div
        className={cx(classNamesWithTheme.picker)}
        style={{ backgroundColor: hexToRgb(color, 100) }}
      />
      <div
        className={cx(classNamesWithTheme.pickerAlpha)}
        style={{ backgroundColor: hexToRgb(color, parseInt(alpha)) }}
      />
      <div className={cx(classNamesWithTheme.pickerTexture)} />
    </Box>
  );
};

export default Color;
