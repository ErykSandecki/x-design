import { FC } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useClickableAreaEvents } from './hooks/useClickableAreaEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { SW } from './constants';

// store
import { eventsSelector } from 'store/pageBuilder/selectors';

// styles
import styles from './clickable-area.scss';

// types
import { TRectCoordinates } from 'types';

export type TClickableAreaProps = {
  rectCoordinates: TRectCoordinates;
};

const ClickableArea: FC<TClickableAreaProps> = ({ rectCoordinates }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { isMultipleMoving } = useSelector(eventsSelector);
  const { x1, x2, y1, y2 } = rectCoordinates;
  const height = y2 - y1;
  const width = x2 - x1;
  const { ...events } = useClickableAreaEvents();

  if (isMultipleMoving) {
    return null;
  }

  return (
    <svg
      className={cx(classNamesWithTheme[className])}
      style={{
        height: `${height}px`,
        left: `${x1}px`,
        top: `${y1}px`,
        width: `${width}px`,
      }}
    >
      <path
        className={cx(classNamesWithTheme.outline)}
        d={`M ${0},${0} H ${width} V ${height} H ${0} V ${0}`}
        strokeWidth={SW}
        {...events}
      />
    </svg>
  );
};

export default ClickableArea;
