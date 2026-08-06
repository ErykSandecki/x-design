import cx from 'classnames';
import { FC } from 'react';
import { Spin } from 'antd';

// styles
import styles from './color-grid.scss';

// types
import { TUseColorSamplerEvents } from '../hooks/useColorSamplerEvents';

export type TColorResultProps = {
  colors: TUseColorSamplerEvents['colors'];
  isPending: TUseColorSamplerEvents['isPending'];
};

export const ColorGrid: FC<TColorResultProps> = ({ colors, isPending }) => {
  return (
    <div className={cx(styles.ColorGrid)}>
      <div className={cx(styles['ColorGrid__color-grid'])}>
        {colors.map(({ a, b, g, r }, index) => (
          <div
            className={cx(styles['ColorGrid__picker-grid'])}
            key={index}
            style={{ backgroundColor: `rgba(${r},${g},${b},${a})` }}
          />
        ))}
      </div>
      <div className={cx(styles['ColorGrid__picker-target-color'])} />
      {isPending && (
        <div className={cx(styles.ColorGrid__loader)}>
          <Spin />
        </div>
      )}
    </div>
  );
};

export default ColorGrid;
