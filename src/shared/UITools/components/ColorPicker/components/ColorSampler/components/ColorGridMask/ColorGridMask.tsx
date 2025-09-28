import { FC } from 'react';

// components
import Box from '../../../../../../../UI/components/Box/Box';
import E2EDataAttribute from '../../../../../../../E2EDataAttributes/E2EDataAttribute';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { MIDDLE_ARRAY } from '../../constants';

// styles
import styles from './color-grid-mask.scss';

// types
import { E2EAttribute } from 'types';
import { TUseColorSamplerEvents } from '../../hooks/useColorSamplerEvents';

// utils
import { rgbToHex } from 'utils';

export type TColorGridMaskProps = {
  colors: TUseColorSamplerEvents['colors'];
  onClickColorSampler: TFunc<[string]>;
};

export const ColorGridMask: FC<TColorGridMaskProps> = ({ colors, onClickColorSampler }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { r, g, b } = colors[MIDDLE_ARRAY] || { a: 0, b: 0, g: 0, r: 0 };

  return (
    <E2EDataAttribute type={E2EAttribute.button} value="color-sampler">
      <Box
        classes={{ className: cx(classNamesWithTheme[className]) }}
        onClick={() => onClickColorSampler(rgbToHex(r, g, b))}
        sx={{ height: '150px', left: '-150px', position: 'absolute', top: '-150px', width: '150px' }}
      />
    </E2EDataAttribute>
  );
};

export default ColorGridMask;
