import cx from 'classnames';
import { FC } from 'react';

// components
import { Small } from '../../../../UI/Typography';

// others
import { MIDDLE_ARRAY } from '../constants';

// styles
import styles from './color-result.module.scss';

// types
import { TUseColorSamplerEvents } from '../hooks/useColorSamplerEvents';

// utils
import { rgbToHex } from 'utils';

export type TColorResultProps = {
  colors: TUseColorSamplerEvents['colors'];
};

export const ColorResult: FC<TColorResultProps> = ({ colors }) => {
  const { r, g, b, a } = colors[MIDDLE_ARRAY] || { a: 0, b: 0, g: 0, r: 0 };

  return (
    <div className={cx(styles.ColorResult)}>
      <div
        className={cx(styles['ColorResult__selected-color'])}
        style={{ backgroundColor: `rgba(${r},${g},${b},${a})` }}
      />
      <Small>{rgbToHex(r, g, b)}</Small>
    </div>
  );
};

export default ColorResult;
