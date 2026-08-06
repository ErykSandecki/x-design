import cx from 'classnames';
import { FC, memo } from 'react';

// components
import MouseModes, { TMouseModeProps } from './MouseModes/MouseModes';

// styles
import styles from './toolbar.scss';

export type TToolbarProps = Pick<TMouseModeProps, 'mouseMode' | 'setMouseMode'>;

const Toolbar: FC<TToolbarProps> = ({ ...restProps }) => (
  <div
    className={cx(styles.Toolbar)}
    onMouseDown={(event) => event.stopPropagation()}
    style={{ touchAction: 'manipulation' }}
  >
    <MouseModes {...restProps} />
  </div>
);

export default memo(Toolbar);
