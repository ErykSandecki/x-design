import { FC } from 'react';

// hooks
import { useMouseDownEvent } from './hooks/useMouseDownEvent';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

import { SW } from './constants';

// styles
import styles from './clickable-area.scss';

// types
import { TRectCoordinates } from 'types';

export type TClickableAreaProps = {
  rectCoordinates: TRectCoordinates;
};

const ClickableArea: FC<TClickableAreaProps> = ({ rectCoordinates }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { x1, x2, y1, y2 } = rectCoordinates || {};
  const onMouseDown = useMouseDownEvent();

  return (
    <svg className={cx(classNamesWithTheme[className])}>
      <path
        className={cx(classNamesWithTheme.outline)}
        onMouseDown={onMouseDown}
        d={`M ${x1},${y1} H ${x2} V ${y2} H ${x1} V ${y1}`}
        strokeWidth={SW}
      />
    </svg>
  );
};

export default ClickableArea;
