import cx from 'classnames';
import { FC } from 'react';

// styles
import styles from './color.scss';

// utils
import { hexToRgb } from 'utils';

export type TColorProps = {
  alpha: string;
  color: string;
};

export const Color: FC<TColorProps> = ({ alpha, color }) => (
  <div className={cx(styles.Color)}>
    <div className={cx(styles.Color__picker)} style={{ backgroundColor: hexToRgb(color, 100) }} />
    <div
      className={cx(styles['Color__picker-alpha'])}
      style={{ backgroundColor: hexToRgb(color, parseInt(alpha)) }}
    />
    <div className={cx(styles['Color__picker-texture'])} />
  </div>
);

export default Color;
