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
  const { x1, x2, y1, y2 } = rectCoordinates || {};
  const { ...events } = useClickableAreaEvents();

  if (isMultipleMoving) {
    return null;
  }

  return (
    <svg className={cx(classNamesWithTheme[className])}>
      <path
        className={cx(classNamesWithTheme.outline)}
        d={`M ${x1},${y1} H ${x2} V ${y2} H ${x1} V ${y1}`}
        strokeWidth={SW}
        {...events}
      />
    </svg>
  );
};

export default ClickableArea;
