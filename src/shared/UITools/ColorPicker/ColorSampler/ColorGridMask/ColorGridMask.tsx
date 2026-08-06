import cx from 'classnames';
import { FC } from 'react';

// components
import E2EDataAttribute from '../../../../E2EDataAttributes/E2EDataAttribute';

// others
import { MIDDLE_ARRAY } from '../constants';

// styles
import styles from './color-grid-mask.scss';

// types
import { E2EAttribute } from 'types';
import { TUseColorSamplerEvents } from '../hooks/useColorSamplerEvents';

// utils
import { rgbToHex } from 'utils';

export type TColorGridMaskProps = {
  colors: TUseColorSamplerEvents['colors'];
  onClickColorSampler: TFunc<[string]>;
};

export const ColorGridMask: FC<TColorGridMaskProps> = ({ colors, onClickColorSampler }) => {
  const { r, g, b } = colors[MIDDLE_ARRAY] || { a: 0, b: 0, g: 0, r: 0 };

  return (
    <E2EDataAttribute type={E2EAttribute.button} value="color-sampler">
      <div className={cx(styles.ColorGridMask)} onClick={() => onClickColorSampler(rgbToHex(r, g, b))} />
    </E2EDataAttribute>
  );
};

export default ColorGridMask;
