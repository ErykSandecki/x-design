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
import { TElements } from '../MultipleElementsArea/types';

export type TClickableAreaProps = {
  elementsCordinates: TElements['elementsCordinates'];
  rectCoordinates: TRectCoordinates;
};

const ClickableArea: FC<TClickableAreaProps> = ({
  elementsCordinates,
  rectCoordinates,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { isMultipleMoving } = useSelector(eventsSelector);
  const { x1, x2, y1, y2 } = rectCoordinates;
  const height = y2 - y1;
  const width = x2 - x1;
  const { onMouseDown } = useClickableAreaEvents();

  if (isMultipleMoving) {
    return null;
  }

  return (
    <>
      {/* OUTLINE */}
      <svg
        className={cx(classNamesWithTheme[className])}
        style={{
          height: `${height}px`,
          left: `${x1}px`,
          pointerEvents: isMultipleMoving ? 'none' : 'all',
          top: `${y1}px`,
          width: `${width}px`,
        }}
      >
        <path
          className={cx(classNamesWithTheme.outline)}
          d={`M ${0},${0} H ${width} V ${height} H ${0} V ${0}`}
          strokeWidth={SW}
          onMouseDown={(event) => onMouseDown(event, '-1')}
        />
      </svg>

      {/* RECTS AS SHADOW */}
      {elementsCordinates.map(({ coordinates: { x1, x2, y1, y2 }, id }) => (
        <svg
          key={id}
          className={cx(classNamesWithTheme[className])}
          style={{
            height: `${y2 - y1}px`,
            left: `${x1}px`,
            pointerEvents: isMultipleMoving ? 'none' : 'all',
            top: `${y1}px`,
            width: `${x2 - x1}px`,
          }}
        >
          <rect
            x={0}
            y={0}
            width={x2 - x1}
            height={y2 - y1}
            fill="red"
            onMouseDown={(event) => onMouseDown(event, id)}
          />
        </svg>
      ))}
    </>
  );
};

export default ClickableArea;
